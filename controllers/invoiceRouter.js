const invoiceController = require('../controllers/invoiceController')
const requireLogin = require('../config/requiredLogin')

module.exports = app => {
    app.get('/invoices', requireLogin, invoiceController.findAll)
   
    app.get('/create', requireLogin, invoiceController.createForm)

    app.get('/pay/:id', requireLogin, invoiceController.payForm)

    app.post('/create' ,requireLogin, invoiceController.create)

    app.put('/pay/:id',requireLogin, invoiceController.update)
}