const express = require("express");
const cors = require("cors");
const { Op } = require('sequelize')
const Sequelize = require("sequelize");
const db = require("./models");
const moment = require("moment");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

const Transaction = db.transaction;
const User = db.user;
const TicketType = db.ticketType;
const UserLike = db.userLike;
const Event = db.event;

User.hasMany(UserLike);
Event.hasMany(TicketType);
UserLike.hasOne(Event, { foreignKey: 'category', sourceKey: 'category' });
TicketType.hasMany(Transaction);

app.get("/user/:id/watch-out", async (req, res) => {
  try {
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
    res.send(events)
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});