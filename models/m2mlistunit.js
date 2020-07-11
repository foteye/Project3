module.exports = function (sequelize, DataTypes) {
  var M2MListUnit = sequelize.define(
    "M2MListUnit",
    {
      list: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      qty: {
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

  return M2MListUnit;
};
