var View = require('View');
var Helper = require('Helper');
var reportListTemp = require('report-list-template');

function ReportListView (reports) {
    View.call(this);
    this.reports = reports;
    this.el = document.querySelector('#report-list-view');
}

ReportListView.prototype = Object.create(View.prototype);

ReportListView.prototype.constructor = ReportListView;

var proto = {
    reports: [],
    template: reportListTemp,
    render: function () {
        this.el.innerHTML = this.template(this.reports);
    }
};

Helper.mixin(ReportListView.prototype, proto);
Helper.mixin = function (target) {
    target.doSomething = Helper.prototype.doSomething;
};

module.exports = ReportListView;