const router = require('express').Router()
const {Drawing} = require('../db/models')

// <-- assumes main route to products set up with app.use in index.js -->  //

router.get('/', async (req, res, next) => {
  try {
    const allDrawings = await Drawing.findAll()
    allDrawings.map(drawing => {
      return drawing
    })
    res.json(allDrawings)
  } catch (err) {
    next(err)
  }
})

router.get('/:drawingId', async (req, res, next) => {
  try {
    const drawing = await Drawing.findByPk(req.params.drawingId)

    if (drawing) {
      res.json(drawing)
    } else {
      res.status(404).send('drawing not found')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
