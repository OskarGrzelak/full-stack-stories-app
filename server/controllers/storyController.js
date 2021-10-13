const Story = require('./../models/storyModel')

exports.getStories = async (req, res, next) => {
  try {
    const stories = await Story.find()
    res.status(200).json({
      status: 'success',
      data: {
        stories,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.createStory = async (req, res, next) => {
  try {
    const story = await Story.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        story,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.getStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        story,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}
