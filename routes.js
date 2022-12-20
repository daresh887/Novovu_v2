import { addmessages, adduser, checkuser, getmessages, getuserbyid, getusernamebyid } from "./database.js"

export function routes(app){

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

    if(req.session.loggedin) {
      const messages = await getmessages()
      const messageData = []
      for (const message of messages) {
        const [whosent] = await getuserbyid(message.id)
        messageData.push({ messages: message.messages, whosent: whosent })
      }
      const username = req.session.username
      res.render("home", {messages: messageData, user:username})
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
  
  
  
  // app.get("/test", async (req, res) => {

  // })
}

