const PORT = 3000;
import express, { json }  from 'express';
import {routes} from "./routes.js"
import session from "express-session";
import { getuserbyid } from './database.js';
const app = express();

app.set('view engine', 'ejs');
app.use("/assets", express.static('assets'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "hidden",
    resave: true,
    saveUninitialized: true
}))





routes(app, session)

app.listen(PORT, () => {
    console.log("backend running");
})