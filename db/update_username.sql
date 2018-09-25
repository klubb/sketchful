update users
set username = $1
where auth_id = $2
returning *