module.exports = (sequelize, Sequelize) => {
  const TicketType = sequelize.define("Ticket_type", {
    event_id: {
      type: Sequelize.INTEGER,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL
    },
    capacity: {
      type: Sequelize.INTEGER
    },
  }, { underscored: true, freezeTableName: true, timestamps: false });
  return TicketType;
};