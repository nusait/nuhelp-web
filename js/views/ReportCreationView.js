var View = require('View');
var Helper = require('Helper');
var ReportCreationTemp = require('report-creation-template');

function submitReport() {
//    $dto->reporterName = $this->strToName(Input::get('reporters_full_name'));
//    $dto->reporterPhone = Input::get('reporters_phone_number');
//    $dto->reporterEmail = $this->strToEmail(Input::get('reporters_email_address'));
//    $dto->incidentDate = $this->strToIncidentDateTime(Input::get('date_of_incident'));
//    $dto->incidentTime = $this->strToIncidentDateTime(Input::get('time_of_incident'));
//    $dto->location = Input::get('location_of_incident');
//    $dto->incidentLatLong = $this->strToLatLong(Input::get('location_of_incident_specific'));
//    $dto->originLatLong = $this->strToLatLong(Input::get('location_of_origin_specific'));
//    if (is_array(Input::get('person'))) {
//        $dto->person = $this->strToName(Input::get('person')[0]);
//
//    var reporterName = this.querySelector('#reporters_full_name');
//    var reporterPhone = this.querySelector('#reporters_phone_number');
//    var reporter
    var formData = new FormData(this);
    var creatingReport = Helper.ajax('post', Helper.url('reports'), formData);

    creatingReport.then(function (request) {
        console.log(request.responseText);
    }).catch(function (err) {
        console.log(err);
    })

}

function bindEvents() {
    this.on('submit', 'form', function (evt) {
        evt.preventDefault();
        submitReport.call(this);
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