const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// --------- routes for: api/users -----------

// api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    })

    res.status(201).json(createUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await User.findByPk(req.params.id)
    res.json(await updateUser.update(req.body))
  } catch (error) {
    next(error)
  }
})
