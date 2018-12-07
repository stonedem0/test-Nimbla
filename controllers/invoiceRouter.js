const Invoice = require('../models/invoice')

module.exports = app => {
    app.get('/invoices', async(req, res) => {
        const invoices = await Invoice.find().sort({paid_status: -1})
        res.render('invoices', {invoices: invoices})
        console.log('invoices:', invoices, typeof invoices)

    })

    app.get('/create', (req, res) => {
        res.render('invoice')
    })

    app.post('/create', async(req, res) => {
        console.log('body:', req.body)
        const {invoice_value, customer_name, description, paid_status} = req.body;
        const invoice = new Invoice ({
            invoice_value: invoice_value,
            customer_name: customer_name,
            description: description,
            paid_status:paid_status
        })

        console.log('new one: ', invoice)
        try {
            await invoice.save()
            res.redirect('/invoices')
        } catch (err) {
            console.error('Error saving post: %s', err)
            res.send(400, err);
        }
    })
}