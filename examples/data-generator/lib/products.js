'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db, chance) {
    var id = 0;

    return db.categories.reduce(function (acc, category) {
        return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(Array.from(Array(10).keys()).map(function (index) {
            var width = chance.floating({ min: 10, max: 40, fixed: 2 });
            var height = chance.floating({ min: 10, max: 40, fixed: 2 });

            return {
                id: id++,
                category_id: category.id,
                reference: category.name.substr(0, 2) + '-' + chance.string({
                    length: 5,
                    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
                }) + '-' + chance.string({
                    length: 1,
                    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                }),
                width: width,
                height: height,
                price: chance.floating({
                    min: width * height / 20,
                    max: width * height / 15,
                    fixed: 2
                }),
                thumbnail: 'https://marmelab.com/posters/' + category.name + '-' + (index + 1) + '.jpeg',
                image: 'https://marmelab.com/posters/' + category.name + '-' + (index + 1) + '.jpeg',
                description: chance.paragraph(),
                stock: chance.bool({ likelihood: 20 }) ? 0 : chance.integer({ min: 0, max: 250 })
            };
        })));
    }, []);
};

module.exports = exports['default'];