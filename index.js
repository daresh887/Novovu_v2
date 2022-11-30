const PORT = 3000;
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/assets", express.static('assets'));
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

app.listen(PORT, () => {
    console.log("backend running");
})