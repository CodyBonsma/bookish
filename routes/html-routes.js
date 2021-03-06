const { response } = require("express");
var db = require("../models");

let clubArray = [];
let reversedClubArray = [];
let returnedUser;
let returnedClub;

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/signup", function (req, res) {
    res.render("signup", {});
  });

  app.get("/all-clubs", function (req, res) {
    res.render("all-clubs");
  });

  app.get("/active-clubs", function (req, res) {
    db.Club.findAll({
      include: [db.Book],
    })
      .then(function (result) {
        clubArray = [];
        for (let i = 0; i < result.length; i++) {
          let newClubObj = {
            clubName: result[i].dataValues.club_name,
            image: result[i].dataValues.Book.dataValues.image,
            bookTitle: result[i].dataValues.Book.dataValues.title,
            bookId: result[i].dataValues.BookGoodReads,
            bookAuthor: result[i].dataValues.Book.dataValues.author,
            bookYear: result[i].dataValues.Book.dataValues.year,
            id: result[i].dataValues.id,
          };
          clubArray.push(newClubObj);
          reversedClubArray = clubArray.reverse();
        }

        // render the data onto the active-clubs handlebars page
        res.render("active-clubs", { reversedClubArray });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });

  app.get("/my-club", function (req, res) {
    db.User.findOne({
      include: {
        model: db.Club,
        include: {
          model: db.Book,
        },
      },
      where: { id: req.session.userId },
    })
      .then(function (result) {
        let mcpClubName = result.dataValues.Club.dataValues.club_name;
        let mcpBookImage =
          result.dataValues.Club.dataValues.Book.dataValues.image;
        let mcpBookTitle =
          result.dataValues.Club.dataValues.Book.dataValues.title;
        let mcpBookAuthor =
          result.dataValues.Club.dataValues.Book.dataValues.author;
        let mcpBookYear =
          result.dataValues.Club.dataValues.Book.dataValues.year;

        res.render("my-club", {
          email: req.session.username,
          clubName: mcpClubName,
          image: mcpBookImage,
          bookTitle: mcpBookTitle,
          author: mcpBookAuthor,
          year: mcpBookYear,
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });

  app.get("/create-new-club", function (req, res) {
    res.render("create-new-club");
  });

  app.get("/trending", function (req, res) {
    res.render("trending");
  });

  app.get("/my-account", function (req, res) {
    res.render("my-account", {
      email: req.session.username,
    });
  });

  app.get("/test", function (req, res) {
    res.render("test");
  });
};
