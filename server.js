const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const db = require("./models");
const axios = require("axios");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//log for search by Author
axios({
  method: "get",
  url: "https://v1.nocodeapi.com/icecicle04/gr/LrsOCSqWhlpBqsfr/searchAuthor",
  params: { q: "<q>" },
})
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// log for search by book

axios({
  method: "get",
  url: "https://v1.nocodeapi.com/icecicle04/gr/LrsOCSqWhlpBqsfr/search",
  params: { q: "<q>" },
})
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
// .then((response) => console.log(response.data));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.get("/", (req, res) => {
  res.render("index");
});

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
