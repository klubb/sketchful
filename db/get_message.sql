-- select * from messages 
-- where author_id = $1

-- select * from messages 
-- join users on users.id::text = messages.author_id 
-- where author_id = $1

select * from messages 
join users on users.auth_id = messages.author_id
-- where author_id = $1

