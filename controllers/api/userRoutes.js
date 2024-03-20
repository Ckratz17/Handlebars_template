const router = require('express').Router()
const User = require('../../models/User')

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body)

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}})

        if (!userData) {
            res.status(404).json({message: `Incorrect email or password, please try again!`})
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(404).json({message: `Incorrect email or password, please try again!`})
            return
        }

        req.session.save(() => {
            req.session.name = userData.name
            req.session.email = userData.email
            req.session.logged_in = true

            res.status(200).json({message: `Logged in successfully!`})
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).json({message: `You are now logged out!`})
            })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router