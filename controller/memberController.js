// 항상 컨트롤러에서 변수 전송 확인:

const model = require('../model/memberModel');
const common = require('../common/common.js');

const about = ((req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true); // 로그인 체크
        
        if (!loginUserInfo) {
            return; // 로그인하지 않은 경우, checkLogin에서 리디렉션 후 함수 종료
        }

        res.render('member/about', {loginUserInfo});
    } catch (error) {
        res.status(500).send('500 ERROR!!!!!!!!!!!!!!!' + error);
    }
});

const contact = ((req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true); // 로그인 체크
        
        if (!loginUserInfo) {
            return; // 로그인하지 않은 경우, checkLogin에서 리디렉션 처리
        }


        res.render('member/contact', {loginUserInfo}); // samplePost 뷰로 렌더링
    } catch (error) {
        res.status(500).send('500 ERROR!!!!!!!!!!!!!!!' + error);
    }
})



const login = ((req, res) => {
    try {
        res.render('member/login');
    } catch (error) {
        res.status(500).send('500 ERROR!!!!!!!!!!!!!!!'+ error);
    }
});

const loginProc = (async(req, res) => {
    try {
        let { user_id, user_pw } = req.body;

        // XSS 방지 필터 적용
        user_id = common.reqeustFilter(user_id, 20, false);
        user_pw = common.reqeustFilter(user_pw, 20, false);

        const result = await model.loginCheck(user_id, user_pw);

        if (result != null) {
            req.session.user = {
                pkid: result.pkid, 
                user_id: result.user_id, 
                user_name: result.name
            };
            common.alertAndGo(res, "로그인 되었습니다.", "/");
            return;  // 이후 코드 실행 방지
        } else {
            common.alertAndGo(res, "아이디 또는 비밀번호가 틀립니다.", "/member/login");
            return;  // 이후 코드 실행 방지
        }

    } catch (error) {
        res.status(500).send('500 ERROR!!!!!!!!!!!!!!!' + error);
    }
});


module.exports = {about, contact, login, loginProc};