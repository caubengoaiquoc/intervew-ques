module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("Transaction", {
    user_id: {
      type: Sequelize.INTEGER,
    },
    ticket_type_id: {
      type: Sequelize.INTEGER
    },
  }, { underscored: true, freezeTableName: true, timestamps: false });
  return Transaction;
};