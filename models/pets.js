const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const petSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name required'],
  },
  age: {
    type: String,
    required: [true, 'age required'],
  },
  colour: {
    type: String,
    required: [true, 'colour required'],
  },
})

module.exports = mongoose.model('pets', petSchema)
