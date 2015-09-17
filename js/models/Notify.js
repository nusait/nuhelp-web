var State = require('ampersand-state');
var User = require('User');
var moment = require('moment');

var Notify = State.extend({
    props: {
        id: 'number',
        updated_at: 'date',
        created_at: 'date',
        origin_lat: 'number',
        origin_long: 'number',
        destination_lat: 'number',
        destination_long: 'number',
        contact_name: 'string',
        contact_phone: 'string',
        remaining_time: 'number',
        notified_at: {
            type: 'date',
            allowNull: true
        },
        canceled_at: {
            type: 'date',
            allowNull: true
        }
    },
    children: {
        requester: User
    },
    derived: {
        status: {
            deps: ['notified_at', 'canceled_at', 'remaining_time'],
            fn: function () {
                if ( !! this.notified_at) {
                    //return 'notified';
                    return 'Buddy Warned';
                }
                if ( !! this.canceled_at) {
                    return 'canceled';
                }
                if (this.remaining_time > 0 && this.canceled_at === null) {
                    return 'active';
                }
                if (this.notified_at === null && this.canceled_at === null) {
                    //return 'expired';
                    return 'SMS Failed';
                }
                return 'unknown';
            }
        },
        created_ago: {
            deps: ['created_at'],
            fn: function () {
                return moment(this.created_at).fromNow();
            }
        },
        created_str: {
            deps: ['created_at'],
            fn: function () {
                var date = moment(this.created_at);
                return date.format('MM/DD h:mm:ss a');
            }
        }
    }
});

module.exports = Notify;