import { addmessages, adduser, changecash, checkcash, checkuser, checkusername, getiteminfo, getitems, getmessages, getuserbyid, getuserinfo, getusernamebyid, searchuser } from "../database.js"
import { log } from "./log-system.js"
export function routes(app){
  
  log(app)

  app.get("/", async (req, res) => {
    if(req.session.loggedin) {
      const messages = await getmessages()
      const messageData = []
      for (const message of messages) {
        const [whosent] = await getuserbyid(message.id)
        messageData.push({ messages: message.messages, whosent: whosent })
      }
      const username = req.session.username
      const cash = await checkcash(username)
      res.render("home", {messages: messageData, user:username, cash})
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
  
  app.get("/shop", async (req, res) => {
    if(req.session.loggedin){
      const username = req.session.username
      const cash = await checkcash(username)
      const items = await getitems()
      res.render("shop", {cash, items});
    }
    else{
      res.redirect("/login")
    }
  })
  app.get("/item/:id", async (req, res) => {
    if(req.session.loggedin){
      const id =  req.params.id
      const username = req.session.username
      const item = await getiteminfo(id)
      const cash = await checkcash(username)
  
      res.render("item", {item, cash})
    }
    else{
      res.redirect("/login")
    }
  })
  app.get("/user/:id", async (req, res) => {
    if(req.session.loggedin){
      const id =  req.params.id
      const username = req.session.username
      const users_username = await getuserinfo(id)
      const cash = await checkcash(username)

      res.render("user_profile", {users: users_username, cash})
    }
    else{
      res.redirect("/login")
    }
  })
  


  app.get("/test", async (req, res) => {
    if(req.session.loggedin){   
      const username = req.session.username
      const cash = await checkcash(username)
      res.render("test", {cash})
    }
    else{
      res.redirect("/login")
    }
  })
  
  app.post("/getcash", async (req, res) => {
    if(req.session.loggedin){    
      const cash = req.body.moneyinput
      const username = req.session.username
      await changecash(cash, username)
      res.redirect("/")
    }
    else{
      res.redirect("/login")
    }
  })
  app.get("/users", async (req, res) => {
    if(req.session.loggedin){   
      const username = req.session.username
      const cash = await checkcash(username)
      const users = await searchuser(req.session.searched)
      res.render("users", {cash, users})
    }
    else{
      res.redirect("/login")
    }
  })
  app.post("/search", async (req, res) => {
    if(req.session.loggedin){    
      const user = req.body.user_search
      const username = req.session.username
      const cash = await checkcash(username)
      const lol = await searchuser(user)
      res.render("users", {cash, users:lol})
    }
    else{
      res.redirect("/login")
    }
  })
}


