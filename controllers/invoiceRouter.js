const Invoice = require('../models/invoice')

module.exports = app => {
    app.get('/invoices', async(req, res) => {

        const invoices = await Invoice
            .find({user_id: req.user.id})
            .sort({paid_status: -1})
        res.render('invoices', {
            user: req.user.username,
            invoices: invoices
        })
    })

    app.get('/create', (req, res) => {
        res.render('invoice')
    })

    app.get('/pay/:id', (req, res) => {
        let id = req.params.id
        console.log(id)
        res.render('pay', {id: id})
    })

    app.post('/create', async(req, res) => {
        console.log('post user:', req.user.id)
        const {invoice_value, customer_name, description, paid_status, pay_date} = req.body;
        const invoice = new Invoice({
            user_id: req.user.id,
            invoice_value,
            customer_name,
            description,
            pay_date,
            paid_date: '',
            paid_status: 'unpaid'
        })
        try {
            await invoice.save()
            res.redirect('/invoices')
        } catch (err) {
            res.send(400, err);
        }
    })

    app.put('/pay/:id', async(req, res) => {
        console.log('user', req.user)
        let {id, paid_date} = req.body
        if (!paid_date) {
            return res.render('pay', {
                id: id,
                message: 'you should pick a date'
            })
        }
        try {
             await Invoice.findOneAndUpdate( {_id: id, user_id: req.user.id}, {
                paid_date: paid_date,
                paid_status: 'paid'
            })
            console.log(newI)
            res.redirect('/invoices')
        } catch (err) {
            res.send(err);
        }
    })
}