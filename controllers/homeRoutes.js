const router = require('express').Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
    try {
        const userData =  await User.findAll()
      
        res.render('home')
        
    } catch (err) {
        res.status(500).json
    }
})

router.get('/login', async (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/')
            return
        }
        res.render('login')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/signup', async (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/')
            return
        }
        res.render('signup')
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router