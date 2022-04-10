# Question
Our aim is to create a feed for users on their dashboard to notify them of events of certain categories that
they have liked, but not bought a ticket for.
These list of events must be filtered such that:
• is of a category that the user like
• user have not purchased a ticket for this event
• happening within the next 60 days
• have not sold out
• also calculate the number of remaining tickets available as remainingCapacity key
Use npm sequelize to return the list of events with a nested array of ticket id, name and price based on the condition above.
Example json:
[{ id: 1,
name: 'eventNameA',
start_datetime: '2012-04-23T18:25:43.511Z', ticket_types: [
{
id: 1,
name: 'eventATicketA', price: 10.5,
capacity: 20 remainingCapacity: 5
},
{...} ] },
{...}]

# Answer

- Run project
    1. Create table follows scripts.txt file, and insert data as you want
    2. You can go to solution, hit `npm i`
    3. npm run start
    4. http://localhost:8080/user/:id/watch-out to get interest list

- Query 
    const userId = req.params.id;
    const events = await User.findAll({
      attributes: [],
      where: {
        id: {
          [Op.eq]: userId,
        },
      },
      include: [{
        model: UserLike,
        attributes: {
          exclude: ['category', 'user_id']
        },
        include: [{
          model: Event,
          where: {
            start_datetime: {
              [Op.gt]: moment().toDate(),
              [Op.lte]: moment().add(60, 'days').toDate()
            },
          },
          attributes: {
            exclude: ['category']
          },
          include: [{
            model: TicketType,
            attributes: ['id', 'name', 'price', 'capacity',
              [
                Sequelize.literal('capacity - COUNT(ticket_type_id)'), 'remainingCapacity'
              ]
            ],
            include: [{
              model: Transaction,
              where: {
                user_id: { [Op.ne]: userId }
              },
              attributes: [],
              required: false,
            }]
          }]
        }]
      }],
      group: ["User_likes.Event.Ticket_types.Transactions.ticket_type_id"],
      having: {
        "User_likes.Event.Ticket_types.remainingCapacity": {
          [Op.gt]: 0
        }
      },
    })