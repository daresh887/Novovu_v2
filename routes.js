import { addmessages, adduser, checkuser, getmessages, getuserbyid, getusernamebyid } from "./database.js"

export function routes(app, session){




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


  app.get("/", async (req, res) => {
    const data_func = await getmessages()
    if(req.session.loggedin) {
      // hello fellow people working with me i have no clue how this all works and how it doesnt
      // but now that it does i am extremly happy 
      // and if anybody smarter in the team finds a way to fix this nonsense code i will be extremly happy
      // love - Mantas (MrMixerr) 
      const username = req.session.username
      data_func.forEach(async data => {
          var messenger = await getuserbyid(data.user_id)
          res.render("home", {user: username, data:data_func, messenger:messenger})
      });
    } 
    else {
      res.redirect("/login");
    } 
  })
  app.post("/message", async (req, res) => {
    const username = req.session.username
    const message = req.body.message
    var user_id = await getusernamebyid(username)
    

    user_id.forEach(function(user_id, res) {
      var new_id = user_id.id
      addmessages(message, new_id)
    });

    res.redirect("/")


  })
}

