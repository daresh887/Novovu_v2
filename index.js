import Express from "express";
const port = 3000;
const app = Express();

var loggedin = false;

app.set('view engine', 'ejs');
app.use("/assets",Express.static('assets'));


app.post("/register", function(req, res){
    // this should stay here for now
    // change later 
    loggedin = true
    res.redirect("/")
    
})

app.get("/register", function(req, res){
    if (!loggedin == true) {
        res.render("register", {user:"TestingDan"})
    }
    else{
        res.redirect("/home")
    }
})

app.get("/", function(req, res){
    // change later
    if (loggedin == true) {
        res.render("home", {user:"TestingDan"})
    }
    else{
        res.redirect("/register")
    }
})


app.listen(port, () => console.log("backend running"))