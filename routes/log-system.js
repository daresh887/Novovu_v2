import {adduser, checkuser} from "../database.js"
export function log(app){
    
    app.post("/register", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
       
        const data = await adduser(username, password, email)
        res.redirect("/login");
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
      app.get("/logout", (req, res) => {
        req.session.username = ""
        req.session.loggedin = false
        res.redirect("/login");
      })
    
    
}