var State = require('ampersand-state');
var User = require('User');

var Notify = State.extend({
    props: {
        id: 'number',
        updated_at: 'date',
        created_at: 'date',
        original_lat: 'number',
        original_long: 'number',
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
                    return 'notified';
                }
                if (this.notified_at === null && this.canceled_at === null) {
                    return 'expired';
                }
                if (this.remaining_time > 0 && this.canceled_at === null) {
                    return 'active';
                }
                if ( !! this.canceled_at) {
                    return 'canceled';
                }
                return 'unknown';
            }
        }
    }
});