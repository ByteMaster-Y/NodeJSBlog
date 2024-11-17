// model/boardModel.js
const db = require('../common/db');

// 게시글 작성
const writePost = async (user_id, title, content) => {
    try {
        const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
        const param = [user_id, title, content];
        const result = await db.runSql(sql, param);
        console.log('Post written:', result);
        return result; // 추가한 게시글의 pkid 등 필요에 따라 반환
    } catch (error) {
        throw "SQL Query Error on writePost";
    }
};



const getPostById = async (postId) => {
    try {
        const sql = 'SELECT * FROM posts WHERE post_id = ?'; // post_id에 맞춰 SQL 쿼리 작성
        const param = [postId];
        const result = await db.runSql(sql, param);

        console.log(result); // 수정: 'reslut'을 'result'로 변경
        
        if (result.length === 0) {
            throw new Error('게시글을 찾을 수 없습니다.');
        }

        return result[0]; // 첫 번째 결과 반환
    } catch (error) {
        console.error(error); // 오류 내용 출력
        throw "SQL Query Error on getPostById";
    }
};



// 게시글 목록 조회
const getList = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const sql = `SELECT * FROM posts ORDER BY post_id DESC LIMIT ? OFFSET ?`;
        const result = await db.runSql(sql, [limit, offset]);
        console.log(result); // 해당 페이지에 해당하는 목록을 전부 가져와 콘솔로 찍어볼때
        return result;
    } catch (error) {
        throw "SQL Query Error on getList";
    }
};


const getTotalCount = async () => { 
    try {
        const sql = "SELECT COUNT(*) AS count FROM posts";
        const result = await db.runSql(sql);

        return result[0].count;
    } catch (error) {
        throw "SQL Query Error on getTotalCount";
    }
};

// 최신 게시글 n개 가져오기
// const getRecentPosts = async (limit = 5) => {
//     try {
//         const sql = `SELECT * FROM posts ORDER BY post_id DESC LIMIT ?`;
//         const result = await db.runSql(sql, [limit]);
//         return result;
//     } catch (error) {
//         throw "SQL Query Error on getRecentPosts";
//     }
// };

// 게시글 삭제
const deletePost = async (postId) => {
    try {
        const sql = 'DELETE FROM posts WHERE post_id = ?';
        const param = [postId];
        const result = await db.runSql(sql, param);

        console.log(`Post with ID ${postId} deleted`);
        return result;
    } catch (error) {
        throw "SQL Query Error on deletePost";
    }
};

// 최신 게시글 1개 가져오기
const getRecentPosts = async (limit) => {
    try {
        const sql = `SELECT * FROM posts ORDER BY post_id DESC LIMIT ?`;
        const result = await db.runSql(sql, [limit]); // db.runSql로 수정
        return result;
    } catch (error) {
        console.error("SQL Query Error in getRecentPosts:", error);
        throw error;
    }
};

module.exports = {
    writePost,
    getPostById,
    getList,
    getTotalCount,
    deletePost,
    getRecentPosts
    
};
