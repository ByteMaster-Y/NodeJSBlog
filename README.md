# NodeBoard

Node.js와 Express를 기반으로 한 간단한 블로그 게시판 애플리케이션입니다. 사용자는 회원가입 후 로그인하여 게시판에 글을 작성하고, 수정 및 삭제할 수 있습니다.

## 시연이미지

![SCR-20241117-pmuz](https://github.com/user-attachments/assets/2efdcdf6-3340-432f-952e-8613dbe4299c)

![SCR-20241117-pmcj](https://github.com/user-attachments/assets/45a15de2-382f-4c1e-99d3-770b75b1a839)

![SCR-20241117-plij](https://github.com/user-attachments/assets/bc52ee5c-2700-4b86-8e5c-4af9f4eb4a33)

## 개발

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" style="max-height: 40px;">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/express-000000.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" style="max-height: 40px;">
  <img src="https://img.shields.io/badge/MySQL-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" style="max-height: 40px;">
</div>

## 사용 기술

- **Node.js**: 서버 사이드 로직을 처리하는 데 사용.
- **Express**: 웹 애플리케이션 프레임워크로 사용.
- **MySQL2**: 데이터베이스 관리 시스템.

## 프로젝트 목적

이 프로젝트의 목적은 사용자가 로그인하고 게시글을 작성할 수 있는 간단한 게시판을 제공하는 것입니다. 게시글의 작성, 수정, 삭제 기능과 사용자 인증 시스템을 통해 기본적인 게시판 환경을 제공합니다.


## 프로젝트 개발배경

인터넷 커뮤니티에서 사용되는 게시판 시스템은 가장 기본적인 웹 애플리케이션 중 하나입니다. 이 프로젝트는 Node.js와 Express.js의 학습과 실습을 위해 시작되었으며, 실제로 사용할 수 있는 간단한 게시판 애플리케이션을 만드는 것을 목표로 하고 있습니다.


## 주요 기능

- **회원가입 및 로그인**: 사용자는 계정을 생성하고, 로그인하여 게시판에 접근할 수 있습니다.
- **게시글 작성 및 수정**: 로그인한 사용자는 새로운 게시글을 작성하고 수정할 수 있습니다.
- **게시글 삭제**: 본인이 작성한 게시글을 삭제할 수 있습니다.
- **페이징 기능**: 게시판 내 게시글을 페이징 할 수 있는 기능이 제공됩니다.


## 사용 방법

1. **프로젝트 설치**:
    - 레포지토리를 클론합니다:
      ```bash
      git clone https://github.com/your-username/node-board.git
      ```
    - 프로젝트 디렉토리로 이동합니다:
      ```bash
      cd node-board
      ```
    - 필요한 패키지를 설치합니다:
      ```bash
      npm install
      ```

2. **환경 설정**:
    - `.env` 파일을 생성하고 다음과 같이 환경 변수를 설정합니다:
      ```env
      PORT=3000
      DATABASE_URL=mysql://user:password@localhost:3306/nodeboard
      JWT_SECRET=your_jwt_secret
      ```

3. **데이터베이스 설정**:
    - MySQL을 사용하여 데이터베이스를 생성하고, `DATABASE_URL`에 해당하는 접속 정보를 `.env`에 입력합니다.

4. **서버 실행**:
    - 개발 모드에서 서버를 실행하려면:
      ```bash
      npm run dev
      ```

5. **웹사이트 접속**:
    - 브라우저에서 `http://localhost:3000`에 접속하여 게시판을 사용합니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
