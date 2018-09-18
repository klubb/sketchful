insert into users
(username, picture, auth_id)
values
($1,$2,$3)
returning *;