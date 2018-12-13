const invoiceController = require('../controllers/invoiceController')
const Invoice = require('../models/invoice')
const requireLogin = require('../config/requiredLogin')

// Perhaps this isn't the most elegant solution for the router. 
//But this one is easily for testing.

module.exports = app => {
    app.get('/invoices', requireLogin, async function (req, res) {
        const user_id = req.user.id
        try {
            let invoices = await invoiceController.findAll(user_id, Invoice)
            res.render('invoices', {
                        user: req.user.username,
                        invoices: invoices
                    })
            
        } catch(err){
            res.send(400, err)
        }
    })
       
    app.get('/create', requireLogin, (req, res) => {
        res.render('invoice')
    })

    app.get('/pay/:id', requireLogin, (req, res) => {
        let id = req.params.id
        res.render('pay', {id: id})
    })

    app.post('/create', requireLogin, async function (req, res) {
        let body = req.body;
        const user_id = req.user.id;
        try {
            await invoiceController.create(body, user_id, Invoice)
            res.redirect('/invoices')
        } catch (err) {
            res.send(400, err)
        }
    })

    app.put('/pay/:id', requireLogin, async function (req, res) {
        let body = req.body
        const user_id = req.user.id
        if (!body.paid_date) {
            return res.render('pay', {
                id: req.body.id,
                message: 'you should pick a date'
            })
        }
        try {
            await invoiceController.update(body, user_id, Invoice)
            res.redirect('/invoices')
        } catch (err) {
            res.send(err);
        }
    })
}