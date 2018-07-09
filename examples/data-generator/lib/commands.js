'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _is_after = require('date-fns/is_after');

var _is_after2 = _interopRequireDefault(_is_after);

var _sub_days = require('date-fns/sub_days');

var _sub_days2 = _interopRequireDefault(_sub_days);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db, chance, randomDate) {
    var today = new Date();
    var aMonthAgo = (0, _sub_days2.default)(today, 30);

    return Array.from(Array(600).keys()).map(function (id) {
        var nbProducts = chance.weighted([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]);
        var basket = Array.from(Array(nbProducts).keys()).map(function () {
            return {
                product_id: chance.integer({ min: 0, max: 10 * 13 - 1 }),
                quantity: chance.weighted([1, 2, 3, 4, 5], [10, 5, 3, 2, 1])
            };
        });

        var total_ex_taxes = basket.reduce(function (total, product) {
            return total + db.products[product.product_id].price * product.quantity;
        }, 0);

        var delivery_fees = chance.floating({ min: 3, max: 8, fixed: 2 });
        var tax_rate = chance.pick([0.12, 0.17, 0.2]);
        var taxes = parseFloat(((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2));
        var customer = chance.pick(db.customers.filter(function (customer) {
            return customer.has_ordered;
        }));
        var date = randomDate(customer.first_seen, customer.last_seen);

        var status = (0, _is_after2.default)(date, aMonthAgo) && chance.bool() ? 'ordered' : chance.weighted(['delivered', 'cancelled'], [10, 1]);
        return {
            id: id,
            reference: chance.string({
                length: 6,
                pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
            }),
            date: date,
            customer_id: customer.id,
            basket: basket,
            total_ex_taxes: total_ex_taxes,
            delivery_fees: delivery_fees,
            tax_rate: tax_rate,
            taxes: taxes,
            total: parseFloat((total_ex_taxes + delivery_fees + taxes).toFixed(2)),
            status: status,
            returned: status == 'delivered' ? chance.bool({ likelihood: 10 }) : false
        };
    });
};

module.exports = exports['default'];