# Write one raw sql query that fulfils the following condition using the same schema as Question 7
• is of a category that the user like
• user have not purchased a ticket for this event
• happening within the next 60 days
• have not sold out

# Answer
To get interest list for user with id 3 

SELECT `User`.`id`, `User_likes`.`category` AS `User_likes.category`, `User_likes`.`user_id` AS `User_likes.user_id`, `User_likes`.`user_id` AS `User_likes.UserId`, `User_likes->Event`.`id` AS `User_likes.Event.id`, `User_likes->Event`.`name` AS `User_likes.Event.name`, `User_likes->Event`.`start_datetime` AS `User_likes.Event.start_datetime`, `User_likes->Event->Ticket_types`.`id` AS `User_likes.Event.Ticket_types.id`, `User_likes->Event->Ticket_types`.`name` AS `User_likes.Event.Ticket_types.name`, `User_likes->Event->Ticket_types`.`price` AS `User_likes.Event.Ticket_types.price`, `User_likes->Event->Ticket_types`.`capacity` AS `User_likes.Event.Ticket_types.capacity`, capacity - COUNT(ticket_type_id) AS `User_likes.Event.Ticket_types.remainingCapacity` FROM `User` AS `User` LEFT OUTER JOIN ( `User_like` AS `User_likes` INNER JOIN `Event` AS `User_likes->Event` ON `User_likes`.`category` = `User_likes->Event`.`category` AND (`User_likes->Event`.`start_datetime` > NOW() AND `User_likes->Event`.`start_datetime` <= DATE_ADD(NOW(), INTERVAL 60 DAY)) LEFT OUTER JOIN `Ticket_type` AS `User_likes->Event->Ticket_types` ON `User_likes->Event`.`id` = `User_likes->Event->Ticket_types`.`event_id` LEFT OUTER JOIN `Transaction` AS `User_likes->Event->Ticket_types->Transactions` ON `User_likes->Event->Ticket_types`.`id` = `User_likes->Event->Ticket_types->Transactions`.`ticket_type_id` AND `User_likes->Event->Ticket_types->Transactions`.`user_id` != '3' ) ON `User`.`id` = `User_likes`.`user_id` WHERE `User`.`id` = '3' GROUP BY `User_likes->Event->Ticket_types->Transactions`.`ticket_type_id` HAVING `User_likes.Event.Ticket_types.remainingCapacity` > 0;
