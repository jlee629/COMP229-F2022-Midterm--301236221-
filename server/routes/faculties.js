/* faculties.js, Jungyu Lee, 301236221, Faculty Information */ 

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  res.render("faculties/add", { title: "Add Faculty" });
});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  let newfaculty = faculty({
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  });
  faculty.create(newfaculty, (err, faculty) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the faculty-list
      res.redirect("/faculties");
    }
  });
});

// GET the faculty  Details page in order to edit an existing faculty
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  faculty.findById(id, (err, facultytoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("faculties/details", { title: "Edit Faculty", faculty: facultytoedit });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatefaculty = faculty({
    _id: id,
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  });
  faculty.updateOne({ _id: id }, updatefaculty, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/faculties");
    }
  });
});

// GET - process the delete, use Facultyname
router.get("/delete/:Facultyname", (req, res, next) => {
  let Facultyname = req.params.Facultyname;
  faculty.remove({ Facultyname: Facultyname }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/faculties");
    }
  });
});

module.exports = router;
