const Invoice = require('../models/invoice')

module.exports = app => {
    app.get('/invoices', async(req, res) => {

        const invoices = await Invoice.find({user_id:req.user.id}).sort({paid_status: -1})
        res.render('invoices', {
            user: req.user.username,
            invoices: invoices})
        // console.log('invoices:', invoices, typeof invoices)

    })

    app.get('/create', (req, res) => {
        res.render('invoice')
    })

    app.post('/create', async(req, res) => {
        console.log('post user:', req.user.id)
        const {invoice_value, customer_name, description, paid_status} = req.body;
        const invoice = new Invoice ({
            user_id: req.user.id, 
            invoice_value: invoice_value,
            customer_name: customer_name,
            description: description,
            paid_status:'unpaid'
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

    app.put('/pay', async(req, res) => {
        let id = req.params.id
        console.log('put')
        try {
            // const newPost = await Post.findByIdAndUpdate(id, req.body, {new: true})
            // res.send(newPost);
        } catch (err) {

            res.send(500, err);

        }
    });
}