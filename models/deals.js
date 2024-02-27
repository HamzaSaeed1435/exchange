const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Deals = sequelize.define('deals', {
    deal_no: {
      type: DataTypes.STRING,
    },
    buy_amount: {
      type: DataTypes.FLOAT, 
    },
    sell_amount: {
      type: DataTypes.FLOAT,
    },
    booked_rate: {
      type: DataTypes.FLOAT, 
    },
    revenue: {
      type: DataTypes.FLOAT, 
    },
    margin: {
      type: DataTypes.FLOAT,
    },
    deal_type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    valid_date: {
      type: DataTypes.DATE,
    },
    created_date: {
      type: DataTypes.DATE,
    },
  }, {
    timestamps: false
}
);

Deals.associate = function (models) {
  Deals.belongsTo(models.user, {
    foreignKey: {
      name: "user_id",
  },
});

};

module.exports = Deals;
