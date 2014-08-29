var loginTemp = require('./templates/login.hbs');
var Auth = require('Auth');
var Navigation = require('Navigation');
var View = require('View');
var Helper = require('Helper');
var ReportListView = require('ReportListView');

var login = loginTemp();

//document.body.insertAdjacentHTML('beforeend', login);

document.querySelector('#login-view').innerHTML = login;

document.querySelector('#login-view form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    var netid = this.querySelector('#netid').value;
    var password = this.querySelector('#password').value;
    var login = Auth.login(netid, password);
    login.then(function (request) {
        console.log(request.responseText);
    });
});

Navigation.bindNavigationEvents();

var reports = [
    {
        id: 1,
        phone: null,
        email: null,
        date_of_incident: "2014-02-23",
        time_of_incident: "21:29:07",
        location: null,
        incident_lat: "76.0345520",
        incident_long: "136.8774500",
        origin_lat: "-7.5497320",
        origin_long: "146.4325620",
        person: "Domenica Robel III",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Fuga harum minima atque ea sit et. Iusto ipsa a excepturi velit omnis quia et eum. Eaque iure ab quas ab optio aliquam voluptatem.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 2,
        phone: "(375)109-9110x070",
        email: "norn@hotmail.com",
        date_of_incident: "2002-02-27",
        time_of_incident: "18:27:08",
        location: null,
        incident_lat: "74.0486150",
        incident_long: "136.2629850",
        origin_lat: "40.4397420",
        origin_long: "-50.1685980",
        person: "Kelton Becker",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Porro possimus voluptatem doloremque consequuntur vel aut similique. Sapiente qui voluptatem eligendi est. Velit itaque velit assumenda eligendi ex nihil ut.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 3,
        phone: null,
        email: null,
        date_of_incident: "1992-08-15",
        time_of_incident: "09:37:37",
        location: null,
        incident_lat: "-60.0585640",
        incident_long: "22.3852430",
        origin_lat: "63.4073330",
        origin_long: "69.8874420",
        person: "Mrs. Shane Kuhic Sr.",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Laudantium excepturi doloremque sint maiores necessitatibus culpa fugiat. Temporibus non voluptate veniam est omnis. Et nisi error voluptate incidunt ea et cum. Accusamus vel et sapiente iste.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 4,
        phone: "1-806-056-1969x505",
        email: "brian28@hotmail.com",
        date_of_incident: "2010-06-02",
        time_of_incident: "00:48:19",
        location: null,
        incident_lat: "-56.6140020",
        incident_long: "33.7358770",
        origin_lat: "-0.1123880",
        origin_long: "30.8453520",
        person: "Vern Kessler",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Architecto est numquam omnis est similique vel dolor. Doloribus debitis quaerat exercitationem. Alias reiciendis nesciunt voluptatem eligendi ipsum sed. Sit a qui quo dolorem.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 5,
        phone: null,
        email: null,
        date_of_incident: "1977-11-07",
        time_of_incident: "10:49:36",
        location: null,
        incident_lat: "75.6089700",
        incident_long: "-103.9611010",
        origin_lat: "-89.1361990",
        origin_long: "-41.7162440",
        person: "Alysson Kozey",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Molestiae et dignissimos eum. Sunt ab ut odio nisi recusandae ex. Sed doloremque cum expedita porro aut tempora. Omnis et unde non exercitationem error nulla eum odio.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 6,
        phone: "(746)531-8295",
        email: "zconroy@yahoo.com",
        date_of_incident: "1999-04-23",
        time_of_incident: "06:23:51",
        location: null,
        incident_lat: "-86.1973270",
        incident_long: "-18.7653810",
        origin_lat: "-39.7184850",
        origin_long: "-37.8769150",
        person: "Karen Davis",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Temporibus delectus qui vero. Error aut asperiores fuga magnam et. Autem quo qui pariatur facere. Quod tempore id quia quis voluptas.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 7,
        phone: null,
        email: null,
        date_of_incident: "1998-01-20",
        time_of_incident: "05:23:31",
        location: null,
        incident_lat: "-25.8949230",
        incident_long: "-169.2716690",
        origin_lat: "85.2319770",
        origin_long: "-134.5087030",
        person: "Mr. Rosalind Hagenes I",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Architecto praesentium unde quis dolor aut eum. Harum omnis maxime ab enim enim omnis. Atque debitis laboriosam rerum voluptatem rerum. Asperiores nihil qui quam quibusdam.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 8,
        phone: "895-866-5678",
        email: "carmel.dickinson@yahoo.com",
        date_of_incident: "1993-07-29",
        time_of_incident: "11:58:11",
        location: null,
        incident_lat: "-18.7152980",
        incident_long: "-168.1680320",
        origin_lat: "41.2217850",
        origin_long: "130.4164670",
        person: "Hans Effertz",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Tenetur dicta tempore deleniti praesentium inventore vero. Et veritatis rem debitis aliquam consequatur totam consequatur. Deserunt nam iusto et architecto.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 9,
        phone: null,
        email: null,
        date_of_incident: "2005-09-08",
        time_of_incident: "12:06:12",
        location: null,
        incident_lat: "-22.7668730",
        incident_long: "-113.8227150",
        origin_lat: "-58.8006840",
        origin_long: "67.7350690",
        person: "Martine Mohr",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Aut possimus deserunt enim molestias maiores sit labore. Dolor velit consequuntur optio atque. Quia facere assumenda aut facere quas autem. Non voluptatem id nemo natus et nam.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 10,
        phone: "06443098239",
        email: "savion.bradtke@yahoo.com",
        date_of_incident: "1987-03-02",
        time_of_incident: "02:06:30",
        location: null,
        incident_lat: "-89.1689050",
        incident_long: "-56.0455630",
        origin_lat: "84.7810690",
        origin_long: "-104.5929130",
        person: "Violette Veum",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Aut dolore repellat nostrum dolores nesciunt blanditiis est. Vel ipsam maiores esse itaque doloribus quia praesentium. Voluptas nulla eaque laudantium magnam.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    }
];
window.Helper = Helper;
listView = new ReportListView(reports);
listView.render();
listView.on('click', '.report-list-item', function (evt) {
    console.log(evt);
    console.log(this.querySelector('.person').innerText);
});
listView.on('click', '.report-list-item', function (evt) {
    console.log(this.querySelector('.role').innerText);
});

window.body = document.body;
window.liView = document.querySelector('#report-list-view');
window.roleView = document.querySelector('.role');

console.log(Helper.has(roleView, liView));