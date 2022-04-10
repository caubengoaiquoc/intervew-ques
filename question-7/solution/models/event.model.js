module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("Event", {
    name: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING,
    },
    start_datetime: {
      type: Sequelize.DATE
    }
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  return Event;
};