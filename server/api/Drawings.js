const router = require('express').Router()
const {Drawing, User} = require('../db/models')

// <-- assumes main route to drawings set up with app.use in index.js -->  //

/////finding each signedIn user//////

/////find all drawings for signedIn User////////
router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const allDrawings = await Drawing.findAll({where: {userId: userId}})
    res.json(allDrawings)
  } catch (err) {
    next(err)
  }
})

router.get('/:drawingId', async (req, res, next) => {
  try {
    //////use getDrawings magicMethod
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
//////create drawing for signedIn user
/////Magic Method used Here?
router.post('/', async (req, res, next) => {
  // const userId = req.session.passport.user
  try {
    let currentUser = await User.findByPk(req.session.passport.user)
    const drawing = await Drawing.create(req.body)
    await drawing.assignUser(currentUser)
    res.send(drawing)
  } catch (error) {
    next(error)
  }
})

// /api/drawings/:id
//////update drawing for signedIn user
router.put('/:id', async (req, res, next) => {
  try {
    const drawingId = req.params.id
    const drawing = await Drawing.findByPk(drawingId)

    const editThisDrawing = await drawing.update(req.body)
    console.log('editThisDrawing==>', editThisDrawing)
    res.send(editThisDrawing)
  } catch (error) {
    next(error)
  }
})

// /api/drawings/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const drawingId = req.params.id
    const drawing = await Drawing.findByPk(drawingId)

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
