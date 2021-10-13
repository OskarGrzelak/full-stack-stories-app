const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
  title: String,
  authorId: String,
  author: String,
  excerpt: String,
  text: String,
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story
