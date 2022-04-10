module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
  }, {
    underscored: true, freezeTableName: true, timestamps: false
  });
  return User;
};