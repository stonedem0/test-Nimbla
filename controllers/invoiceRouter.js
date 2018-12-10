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
        let date = req.params.id
        console.log(date)
        res.render('pay', {date: date})
    })

    app.post('/create', async(req, res) => {
        console.log('post user:', req.user.id)
        const {invoice_value, customer_name, description, paid_status, pay_date} = req.body;
        const invoice = new Invoice({user_id: req.user.id, invoice_value: invoice_value, customer_name: customer_name, description: description, pay_date: pay_date, paid_status: 'unpaid'})
        console.log('new one: ', invoice)
        try {
            await invoice.save()
            res.redirect('/invoices')
        } catch (err) {
            console.error('Error saving post: %s', err)
            res.send(400, err);
        }
    })

    app.put('/pay', async(req, res) => {
         console.log('body', req.body)
        try {
            const paidInvoice = await Invoice.findByIdAndUpdate(req.body.date, req.body, {new: true})
            console.log('new', paidInvoice)
            res.redirect('/invoices')
        } catch (err) {
            res.send(err);

        }
    })
}