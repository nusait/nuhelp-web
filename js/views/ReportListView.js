var View = require('View');
var Helper = require('Helper');
var reportListTemp = require('report-list-template');

function ReportListView (reports) {
    View.call(this);
    this.reports = reports;
}

function render() {
    return View.prototype.render.call(this, this.reports);
}

ReportListView.prototype = Object.create(View.prototype);

ReportListView.prototype.constructor = ReportListView;

var proto = {
    sel: '#report-list-view',
    reports: [],
    template: reportListTemp,
    render: render
};

Helper.mixin(ReportListView.prototype, proto);

module.exports = ReportListView;