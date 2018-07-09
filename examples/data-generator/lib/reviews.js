'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _sub_days = require('date-fns/sub_days');

var _sub_days2 = _interopRequireDefault(_sub_days);

var _is_after = require('date-fns/is_after');

var _is_after2 = _interopRequireDefault(_is_after);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db, chance, randomDate) {
    var today = new Date();
    var aMonthAgo = (0, _sub_days2.default)(today, 30);

    var id = 0;
    var reviewers = db.customers.filter(function (customer) {
        return customer.has_ordered;
    }).filter(function () {
        return chance.bool({ likelihood: 60 });
    }) // only 60% of buyers write reviews
    .map(function (customer) {
        return customer.id;
    });

    return db.commands.filter(function (command) {
        return reviewers.indexOf(command.customer_id) !== -1;
    }).reduce(function (acc, command) {
        return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(command.basket.filter(function () {
            return chance.bool({ likelihood: 40 });
        }) // reviewers review 40% of their products
        .map(function (product) {
            var date = randomDate(command.date);
            var status = (0, _is_after2.default)(aMonthAgo, date) ? chance.weighted(['accepted', 'rejected'], [3, 1]) : chance.weighted(['pending', 'accepted', 'rejected'], [5, 3, 1]);

            return {
                id: id++,
                date: date,
                status: status,
                command_id: command.id,
                product_id: product.product_id,
                customer_id: command.customer_id,
                rating: chance.integer({ min: 1, max: 5 }),
                comment: chance.paragraph()
            };
        })));
    }, []);
};

module.exports = exports['default'];