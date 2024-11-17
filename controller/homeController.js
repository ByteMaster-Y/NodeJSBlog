const common = require("../common/common");
const boardModel = require('../model/boardModel');

const home = async (req, res) => {
    try {
        let loginUserInfo = common.checkLogin(req, res);
        if (loginUserInfo != null) {
            // 최근 게시글 가져오기
            const recentPosts = await boardModel.getRecentPosts(1);
            res.render('index', { loginUserInfo, recentPosts }); // recentPosts를 템플릿에 전달
        } 
    } catch (error) {
        res.status(500).send("<H1>500</H1> Error: " + error);
    }
};


module.exports = {
    home
};
