module.exports = function (sequelize, DataTypes) {
  var Model = sequelize.define(
    "Model",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      costPerModel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Model;
};
