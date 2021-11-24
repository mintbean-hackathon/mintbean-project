const router = require('express').Router()
const {Drawing, User} = require('../db/models')

// <-- assumes main route to drawings set up with app.use in index.js -->  //

/////finding each signedIn user//////

// async function checkUser(req, res, next) {
//   // checks if someone is logged in
//   if (req.session.passport) {
//     // this userId is only accessible if someone is logged in
//     const userId = req.session.passport.user
//     const homeDog= await User.findByPk(userId);
//     console.log('homeDog==>',homeDog);

//   }
// }

/////find all drawings for signedIn User/////
router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const allDrawings = await Drawing.findAll({where: {userId: userId}})
    console.log('userId in Drawing.js==>', userId)
    res.json(allDrawings)
    console.log('allDrawings api/drawings.js===>', allDrawings)
  } catch (err) {
    next(err)
  }
})

router.get('/:drawingId', async (req, res, next) => {
  try {
    const drawing = await Drawing.findByPk(req.params.drawingId)

    if (drawing) {
      res.json(drawing)
      console.log('getIndividiaulDrawing,drawing')
    } else {
      res.status(404).send('drawing not found')
    }
  } catch (err) {
    next(err)
  }
})

// /api/drawings
//////create drawing for signedIn user
router.post('/', async (req, res, next) => {
  const userId = req.session.passport.user

  try {
    const drawing = await Drawing.create(req.body)
    console.log('drawing post4==>', drawing)

    res.send(drawing)
    console.log('afterdrawing post4===>', drawing)
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
    console.log('drawingPut===>', drawing)
    res.send(await drawing.update(req.body))
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
