const { DataTypes  } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps: false
}
);


User.associate = function (models) {
  User.hasMany(models.deals, {
    onDelete: "cascade",
    foreignKey: "user_id",
});

};
module.exports = User;
