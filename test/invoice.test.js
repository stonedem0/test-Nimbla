process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const invoiceController = require('../controllers/invoiceController')

describe('test controllers', function () {
    let user_id = 'is42';
    let data = {
        invoice_value: 42
    }
    function FakeInvoice(data) {};
    FakeInvoice.prototype.save = function () {
        this.didCallSave = true;
        return true;
    }
    FakeInvoice.find = function(user_id) {
        this.didFindAll = true;
        return new FakeQuery()
    }
  
    FakeInvoice.findOneAndUpdate = function (body, data) {
        this.didCallUpdate = true;
        return true;
    }
    function FakeQuery() {

    }

    FakeQuery.prototype.sort = function() {
        this.didSort = true
        return this
    }

    it('should create a new invoice', function () {
        let res = invoiceController.create(data, user_id, FakeInvoice)
        expect(res).to.be.true;

    });

    it('should update an existing invoice', function () {
        let body = {
            id: 'isnt42'
        }
        let res = invoiceController.update(body, user_id, FakeInvoice)
        expect(res).to.be.true;

    })

});
