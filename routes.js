import { checkuser } from "./database.js"


export function routes(app, session){


  app.post("/register", (req, res) => {
    username = req.body.username;
    res.redirect("/");
  })

  app.get("/register", (req, res) => {
      res.render("register");
  })

  app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const data = await checkuser(username, password)

    if (data == ""){
      res.send("something went wrong")
    }
    else {
      req.session.username = username
      req.session.loggedin = true
      res.redirect("/");
    }
  })

  app.get("/login", (req, res) => {
    res.render("login");
  })

  app.get("/", (req, res) => {
      if(req.session.loggedin) {
          const username = req.session.username 
          res.render("home", {user: username});
      } else {
          res.redirect("/login");
      }
  })

}