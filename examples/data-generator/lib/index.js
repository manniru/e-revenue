'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _randomDate = require('./randomDate');

var _randomDate2 = _interopRequireDefault(_randomDate);

var _customers = require('./customers');

var _customers2 = _interopRequireDefault(_customers);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _reviews = require('./reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _finalize = require('./finalize');

var _finalize2 = _interopRequireDefault(_finalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { serializeDate: false },
        serializeDate = _ref.serializeDate;

    var chance = new _chance2.default();
    var randomDate = (0, _randomDate2.default)(chance, serializeDate);

    var db = {};

    db.customers = (0, _customers2.default)(db, chance, randomDate);
    db.categories = (0, _categories2.default)(db, chance, randomDate);
    db.products = (0, _products2.default)(db, chance, randomDate);
    db.commands = (0, _commands2.default)(db, chance, randomDate);
    db.reviews = (0, _reviews2.default)(db, chance, randomDate);
    (0, _finalize2.default)(db, chance, randomDate);

    return db;
};

module.exports = exports['default'];