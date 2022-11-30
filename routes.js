module.exports = function(app) {
  var username = undefined

  app.post("/register", (req, res) => {
    username = req.body.username;
    res.redirect("/");
  })

  app.get("/register", (req, res) => {
      res.render("register");
  })

  app.post("/login", (req, res) => {
    username = req.body.username;
    res.redirect("/");
  })

  app.get("/login", (req, res) => {
    res.render("login");
  })

  app.get("/", (req, res) => {
      if(username) {
          res.render("home", {user: username});
          username = undefined;
      } else {
          res.redirect("/register");
      }
  })
}