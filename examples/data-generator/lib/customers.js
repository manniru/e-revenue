'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db, chance, randomDate) {
    return Array.from(Array(900).keys()).map(function (id) {
        var first_seen = randomDate();
        var last_seen = randomDate(first_seen);
        var has_ordered = chance.bool({ likelihood: 25 });
        var email = chance.email();

        return {
            id: id,
            first_name: chance.first(),
            last_name: chance.last(),
            email: email,
            address: has_ordered ? chance.address() : null,
            zipcode: has_ordered ? chance.zip() : null,
            city: has_ordered ? chance.city() : null,
            avatar: 'https://robohash.org/' + (0, _md2.default)(email) + '.png',
            birthday: has_ordered ? chance.birthday() : null,
            first_seen: first_seen,
            last_seen: last_seen,
            has_ordered: has_ordered,
            latest_purchase: null, // finalize
            has_newsletter: has_ordered ? chance.bool({ likelihood: 30 }) : true,
            groups: [], // finalize
            nb_commands: 0,
            total_spent: 0
        };
    });
};

module.exports = exports['default'];