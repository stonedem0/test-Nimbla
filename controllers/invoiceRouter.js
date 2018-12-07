const Invoice = require('../models/invoice')

module.exports = app => {
    app.get('/invoices', async(req, res) => {
        const invoices = await Invoice.find()
        JSON.stringify(invoices)
        invoices.map((i) => {
            res.send(`value: ${i.invoice_value} 
                     description: ${i.description}`)
        })
        console.log('invoices:', invoices, typeof invoices)

    })

    app.post('/create', async(req, res) => {
        console.log('body:', req.body)
        const {invoice_value, customer_name, description} = req.body;
        const invoice = new Invoice ({
            invoice_value: invoice_value,
            customer_name: customer_name,
            description: description,
        })

        console.log('new one: ', invoice)
        try {
            await invoice.save()
            res.send(`new invoice: ${invoice}`)
        } catch (err) {
            console.error('Error saving post: %s', err)
            res.send(400, err);
        }
    })
}