import Express from "express";
const port = 3000;
const app = Express();


app.get("/backend", function(req, res){
    res.send("backend of the server :) ")
})


app.listen(port, () => console.log("backend running"))

    