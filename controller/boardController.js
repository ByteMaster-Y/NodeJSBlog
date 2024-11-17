const common = require("../common/common");
const boardModel = require("../model/boardModel"); // 보드 모델 임포트

// 게시글 작성 페이지 렌더링
const write = (req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true); // 로그인 체크
        
        if (!loginUserInfo) {
            return; // 로그인하지 않은 경우, checkLogin에서 리디렉션 처리
        }

        res.render('board/write', { loginUserInfo }); // 게시글 작성 페이지 렌더링
    } catch (error) {
        res.status(500).send('500 ERROR: ' + error);
    }
};

// 게시글 전송 처리
const writePost = async (req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true);
        if (!loginUserInfo) {
            return; // 로그인하지 않은 경우 리턴
        }

        const { title, content } = req.body;

        // 보드 모델의 writePost 함수 호출
        await boardModel.writePost(loginUserInfo.user_id, title, content); 
        
        res.redirect('/board/list'); // 리디렉션 경로 수정
    } catch (error) {
        console.error(error);
        res.status(500).send('게시글 작성 중 오류가 발생했습니다.');
    }
};


const list = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1; 
        let limit = 10; // 한 페이지에 보여줄 데이터 수

        const loginUserInfo = common.checkLogin(req, res);
        if (loginUserInfo != null) {
            // 전체 데이터 개수 가져오기
            let totalCount = await boardModel.getTotalCount();

            // 페이지에 해당하는 데이터 가져오기 -> 
            let postList = await boardModel.getList(page, limit);

            // 전체 페이지 수 계산
            let totalPages = Math.ceil(totalCount / limit);

            // 페이지 번호와 데이터를 템플릿에 전달
            res.render('board/list', {
                loginUserInfo,
                postList, // 수정됨: 'list' -> 'postList' ====> 여기에서 찍음
                currentPage: page, // 현재 페이지 번호
                totalPages: totalPages // 전체 페이지 수
            });

        }
    } catch (error) {
        res.status(500).send("<H1>500</H1> Error: " + error);
    }
};


// const post = (req, res) => {
//     try {
//         const loginUserInfo = common.checkLogin(req, res, true); // 로그인 체크
        
//         if (!loginUserInfo) {
//             return; // 로그인하지 않은 경우, checkLogin에서 리디렉션 처리
//         }

//         res.render('board/post', { loginUserInfo }); // samplePost 뷰로 렌더링
//     } catch (error) {
//         res.status(500).send('500 ERROR: ' + error);
//     }
// };

// 게시글 보기 페이지 렌더링
const viewPost = async (req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true);
        if (!loginUserInfo) {
            return; // 로그인하지 않은 경우, checkLogin에서 리디렉션 처리
        }

        const { postId } = req.params; // URL 파라미터에서 postId 가져오기
        const postData = await boardModel.getPostById(postId); // 해당 ID로 게시글 데이터 가져오기
        console.log(`Fetching post with ID: ${postId}`); // postId 로그 출력
        res.render('board/view', { loginUserInfo, postData }); // 게시글 뷰 렌더링
    } catch (error) {
        res.status(500).send('500 ERROR: ' + error);
    }
};


// 게시글 삭제 기능 추가
const deletePost = async (req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true); // 로그인 체크

        if (!loginUserInfo) {
            return; // 로그인하지 않은 경우, checkLogin에서 리디렉션 처리
        }

        const { postId } = req.params; // URL 파라미터에서 postId 가져오기
        const postData = await boardModel.getPostById(postId); // 해당 ID로 게시글 데이터 가져오기

        // 게시글 작성자(user_id)가 로그인한 사용자와 동일한지 확인
        if (postData.user_id !== loginUserInfo.user_id) {
            return res.status(403).send('자신이 작성한 글만 삭제할 수 있습니다.'); // 작성자만 삭제 가능
        }

        // 게시글 삭제 처리
        await boardModel.deletePost(postId);

        res.redirect('/board/list'); // 삭제 후 목록으로 리디렉션
    } catch (error) {
        console.error(error);
        res.status(500).send('게시글 삭제 중 오류가 발생했습니다.');
    }
};

// 게시글 수정 페이지 렌더링
const editPost = async (req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true);
        if (!loginUserInfo) {
            return; // 로그인하지 않은 경우 리디렉션 처리
        }

        const { postId } = req.params; // URL 파라미터에서 postId 가져오기
        const postData = await boardModel.getPostById(postId);

        // 작성자 확인
        if (postData.user_id !== loginUserInfo.user_id) {
            return res.status(403).send('자신이 작성한 글만 수정할 수 있습니다.');
        }

        // 수정 페이지 렌더링
        res.render('board/edit', { loginUserInfo, postData });
    } catch (error) {
        res.status(500).send('게시글 수정 페이지 로드 중 오류가 발생했습니다.');
    }
};

// 게시글 수정 처리
const updatePost = async (req, res) => {
    try {
        const loginUserInfo = common.checkLogin(req, res, true);
        if (!loginUserInfo) {
            return;
        }

        const { postId } = req.params;
        const { title, content } = req.body;

        const postData = await boardModel.getPostById(postId);

        // 작성자 확인
        if (postData.user_id !== loginUserInfo.user_id) {
            return res.status(403).send('자신이 작성한 글만 수정할 수 있습니다.');
        }

        // 게시글 수정
        await boardModel.updatePost(postId, title, content);

        res.redirect(`/board/view/${postId}`); // 수정 후 해당 글 보기로 리디렉션
    } catch (error) {
        res.status(500).send('게시글 수정 중 오류가 발생했습니다.');
    }
};


module.exports = { write, writePost, list, viewPost, deletePost, editPost, updatePost };
