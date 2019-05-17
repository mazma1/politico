module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define('Office', {
    type: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  return Office;
};
