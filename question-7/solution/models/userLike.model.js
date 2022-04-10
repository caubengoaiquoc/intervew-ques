module.exports = (sequelize, Sequelize) => {
  const UserLike = sequelize.define("User_like", {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    category: {
      type: Sequelize.STRING,
      primaryKey: true
    },
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  return UserLike;
};