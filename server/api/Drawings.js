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

// /api/drawings
router.post('/drawings', async (req, res, next) => {
  try {
    const drawing = await Drawing.create(req.body)

    res.send(drawing)
  } catch (error) {
    next(error)
  }
})

// /api/drawings/:id
router.put('/drawings/:id', async (req, res, next) => {
  try {
    const drawingtId = req.params.id
    const drawing = await Drawing.findByPk(drawingtId)
    res.send(await drawing.update(req.body))
  } catch (error) {
    next(error)
  }
})

// /api/drawings/:id
router.delete('/drawings/:id', async (req, res, next) => {
  try {
    const drawingtId = req.params.id
    const drawing = await Drawing.findByPk(drawingtId)

    if (!drawing) {
      res.sendStatus(404)
    }
    await drawing.destroy()
    res.send(drawing)
  } catch (error) {
    next(error)
  }
})

module.exports = router
