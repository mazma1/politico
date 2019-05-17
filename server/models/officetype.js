module.exports = (sequelize, DataTypes) => {
  const OfficeType = sequelize.define('OfficeType', {
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  return OfficeType;
};
