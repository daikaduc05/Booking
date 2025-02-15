-- create database bookingphoto;
-- use bookingphoto.dbo;

select * from dbo.users;
insert into users (username, password) values ('admin', '$2a$12$0U/GD3qItusEpjd8wsp1yOyXofPLcVp1LJUPK5QOXHg1r0Q9XwHsq');
insert into roles (name) values ('ADMIN');
insert into user_roles (user_id, role_id) values (1,1);