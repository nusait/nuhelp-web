var View = require('View');
var Helper = require('Helper');
var ReportCreationTemp = require('report-creation-template');

function submitReport() {

}

function bindEvents() {
    this.on('submit', 'form', function (evt) {
        evt.preventDefault();
    });
}

function ReportCreationView () {
    View.call(this);
    bindEvents.call(this);
}
ReportCreationView.prototype = Object.create(View.prototype);

ReportCreationView.prototype.constructor = ReportCreationView;

var proto = {
    sel: '#report-creation-view',
    template: ReportCreationTemp
};

Helper.mixin(ReportCreationView.prototype, proto);

module.exports = ReportCreationView;