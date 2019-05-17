module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    createdBy: DataTypes.UUID,
    office: DataTypes.INTEGER,
    candidate: DataTypes.INTEGER,
  }, {});

  return Vote;
};
