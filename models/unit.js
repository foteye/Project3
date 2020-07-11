module.exports = function (sequelize, DataTypes) {
  var Unit = sequelize.define(
    "Unit",
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
      modelType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelCount: {
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

  return Unit;
};
