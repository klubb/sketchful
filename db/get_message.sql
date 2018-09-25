select * from messages 
where author_id = $1

-- select * from messages 
-- join users on users.id = messages.author_id 
-- where messages.id = $1