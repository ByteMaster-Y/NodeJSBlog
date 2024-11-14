const xss = require('xss');

const checkLogin = (req, res, isMust = true) => {
    let loginUserInfo = req.session.user;

    if (loginUserInfo == null) {
        if (isMust) {
            alertAndGo(res, "로그인이 필요합니다.", "/member/login");
        }
        return null;
    }

    return loginUserInfo;
};

const alertAndGo = (res, msg, url) => {
    res.render('common/alert', {msg, url});
};

const isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); // 정규표현식.
    // 점은 하나만 있어야 하고 그 뒤에 다시 숫자가 올 수 있다.(소수점허용)
};

const reqeustFilter = (data, type, isHtml, defaultvalue = null) => {
    switch (type) {
        case 0:     // 숫자만
            let checkVal = data.replaceAll(',', '');
            if(!isNumber(checkVal)) {
                throw "parameter is not number Error";  // 컨트롤러에 
            }
            break;
        case -1:    // 길이무제한
            if(!isHtml) {
                data = xss(data);   // html로 필터링
            }
            break;
        default:    // 길이 제한(1~~)
            if(type < data.length) {
                throw "input length is too long";
            }

            if(!isHtml) {
                data = xss(data);   // html로 필터링
            }
            break;
    }

    if(data == null || data == '') {
        if(defaultvalue != null) {
            data = defaultvalue;
        } else {
            throw "input parameter not allow null";
        }
    }

    return data;
};

const dateFormat = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
};

///
const pagination = (totalRecord, page) => {
    let totalPage = 0;
    let pageSize = 10;
    let startPage = 0;
    let endPage = 0;
    let prev = false;
    let next = false;

    totalPage = Math.ceil(totalRecord / pageSize);
    if (totalPage > 0) {
        startPage = Math.floor((page - 1) / 10) * 10 + 1;
        endPage = startPage + 10 - 1;
        if(endPage > totalPage) {
            endPage = totalPage;
        }
        
        if(startPage > 10) {
            prev = true;
        }
        
        if(totalPage > endPage) {
            next = true;
        }
    }
    return {totalPage, startPage, endPage, prev, next};
}
//

module.exports = {
    checkLogin,
    alertAndGo,
    reqeustFilter,
    dateFormat,
    pagination
};
