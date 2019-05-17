module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define('Candidate', {
    office: DataTypes.INTEGER,
    party: DataTypes.UUID,
    candidate: DataTypes.UUID,
  }, {});

  return Candidate;
};
