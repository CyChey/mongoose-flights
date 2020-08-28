var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
};

function index(req, res) {
    Flight.find({}).sort('departs').exec(function (err, flights) {
        console.log(new Date());
        res.render('flights/index', {
            flights,
            currentDate: new Date()
        });
    });
}

function newFlight(req, res) {
    var newFlight = new Flight();
    var dt = newFlight.departs;
    var destDate = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}T${dt
        .getHours()
        .toString()
        .padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
    res.render('flights/new', { destDate });
}

function create(req, res) {
    if (req.body.departs === '') delete req.body.departs;
    Flight.create(req.body);
    console.log(req.body);
    res.redirect('flights');
}

function show(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        Ticket.find({ flight: flight._id }, function (err, tickets) {
            res.render('flights/show', {
                flight,
                tickets
            });
        });
    });
}

function deleteFlight(req, res) {
    Flight.findByIdAndRemove(req.params.id, function (err, flight) {
        res.redirect('/');
    });
}