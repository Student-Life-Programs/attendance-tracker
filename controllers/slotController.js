// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Slot model
// author(s): Jake Allinson
//

const Slot = require('../models/Slot');
const Ticket = require('../models/Ticket');

// index - get all slots
exports.index = function (req, res) {
  Slot.find({}, function (err, data) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: data       
      });
    }
  });
};

// add - create a single slot
exports.add = function (req, res) {
  var slot = new Slot();
  slot.attraction_id   = req.body.attraction_id;
  slot.label           = req.body.label;
  slot.ticket_capacity = req.body.ticket_capacity;
  slot.hide_time       = new Date(req.body.hide_time);
  // save and check
  slot.save(function (err) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: slot
      });
    }
  });
};

// view - find a single slot
exports.view = function (req, res) {
  Slot.findById(req.params.id, function (err, data) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: data
      });
    }
  });
};

// update - update a single slot
exports.update = function (req, res) {
  Slot.findById(req.params.id, function (err, slot) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!slot) {
      res.json({
        status: "error",
        message: "No slot found."
      });
    } else {
      // update if attribute was sent
      slot.attraction_id   = req.body.attraction_id ? req.body.attraction_id : slot.attraction_id;
      slot.label           = req.body.label ? req.body.label : slot.label;
      slot.ticket_capacity = req.body.ticket_capacity ? req.body.ticket_capacity : slot.ticket_capacity;
      slot.hide_time       = req.body.hide_time ? new Date(req.body.hide_time) : slot.hide_time;
      // save and check
      slot.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            message: err
          });
        } else {
          res.json({
            status: "success",
            data: slot
          });
        }
      });
    }
  });
};

// delete - delete a single slot
exports.delete = function (req, res) {
  Slot.deleteOne({
    _id: req.params.id
  }, function (err, data) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success"
      });
    }
  });
};