import Express from "express";

const PORT = 3000;
const app = Express();
var username = undefined

app.set('view engine', 'ejs');
app.use("/assets", Express.static('assets'));
app.use(Express.urlencoded({ extended: false }));


app.post("/register", (req, res) => {
    username = req.body.username
    res.redirect("/");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/", (req, res) => {
    if(username) {
        res.render("home", {user: username})
        username = undefined
    } else {
        res.redirect("/register")
    }
})

app.listen(PORT, () => {
    console.log("backend running");
})