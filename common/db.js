const mysql = require('mysql2');

const db = {
    host : '127.0.0.1',
    user : 'kiwu',
    password : 'kiwu!@',
    database : 'kiwudb',
    port: 3306
};

const pool = mysql.createPool(db);
const dbPool = pool.promise();
const runSql = (async(sql, params = null) => {
    let dbCon; // 데이터베이스 연결 객체를 담을 변수
    let result; // SQL 실행 결과를 저장할 변수

    try {
        // 데이터베이스 연결을 가져오는 부분입니다. dbPool.getConnection()은 데이터베이스 풀에서 하나의 연결을 가져옵니다. 
        // 이 작업은 비동기이므로 await을 사용하여 완료될 때까지 기다립니다. 
        dbCon = await dbPool.getConnection();
        // 쿼리를 실행하는 부분입니다. params가 없으면 단순히 SQL 쿼리를 실행하고, params가 있으면 쿼리와 함께 매개변수를 전달합니다.
        // await dbCon.query()**는 SQL 쿼리의 결과를 기다린 후 반환합니다. 결과는 배열로 반환되며, result[0]에는 실제 쿼리 결과가 들어갑니다.
        if(params == null) {
            result = await dbCon.query(sql); 
        } else {
            result = await dbCon.query(sql, params);
        }
        console.log("runSql 함수가 내보내졌습니다:", runSql);
        return result[0];

    } catch(error) {
        throw new Error(error);
    } finally {
        if (dbCon) dbCon.release(); // 다 쓰면 release해야됨 반드시 반환 받아야 됨!
    }
});

module.exports = {
    runSql,
    db
}