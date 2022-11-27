import Express from "express";
const port = 3000;
const app = Express();


app.set('view engine', 'ejs');
app.use("/assets",Express.static('assets'));



app.get("/", function(req, res){
    res.render("home", {user:"TestingDan"})
})


app.listen(port, () => console.log("backend running"))