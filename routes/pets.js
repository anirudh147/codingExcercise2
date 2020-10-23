const express = require('express')
const Joi = require('joi')

const pet = require('../models/pets')
const { validateBody } = require('../middlewares/route')

const router = express.Router()

router.post(
  '/',
  validateBody(
    Joi.object().keys({
      name: Joi.string().required().description('name-required'),
      age: Joi.number().integer().required().description('age-required'),
      colour: Joi.string().default('color-required'),
    }),
  ),
  async (req, res, next) => {
    try {
      const petData = new pet(req.body)
      await petData.save()
      res.status(201).json(petData)
    } catch (e) {
      return res.status(500).send({ error: err })
    }
  },
)

router.get('/', async (req, res, next) => {
  try {
    let petData = await pet.find({})
    if (petData.length == 0) {
      return res.status(404).json({ err: 'no pets present ' })
    }
    return res.status(200).json(petData)
  } catch (error) {
    return res.status(500).send({ error })
  }
})

router.delete('/:name', async (req, res, next) => {
  try {
    let petData = await pet.findOneAndDelete({ name: req.params.name })
    if (!petData) {
      return res.status(404).json({ err: 'no pets data' })
    }
    return res.status(200).send({ success: 'pet deleted ' })
  } catch (error) {
    return res.status(500).send({ error })
  }
})

module.exports = router
