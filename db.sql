drop table if exists member;

create table member
(
	pkid int primary key auto_increment,
    user_id varchar(20) not null,
    user_pw varchar(20) not null,
    name varchar(50) not null,
    regdate timestamp default current_timestamp
);

select * from member

use kiwudb

select pkid, user_id, user_pw, name from member where user_id = 'kiwu' and user_pw = 'kiwu';

insert into member(user_id, user_pw, name) values ('kiwu', 'kiwu', 'kiwu');

ALTER TABLE member ADD UNIQUE (user_id);


DROP TABLE IF EXISTS posts;

CREATE TABLE posts
(
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    regdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES member(user_id)
);
DESCRIBE posts;

select * from posts;

SELECT * FROM posts WHERE post_id = 1;
