const Sequelize = require('sequelize')
const db = require('../db')

const Drawing = db.define('drawing', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Add name',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: 'Add Description',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Drawing

///instance method/////
Drawing.prototype.assignUser = function(user) {
  return this.setUser(user)
}
