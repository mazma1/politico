module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    hqAddress: DataTypes.STRING,
    logoUrl: {
      type: DataTypes.STRING,
    },
  }, {});

  return Party;
};
