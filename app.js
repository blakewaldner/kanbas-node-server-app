import express from "express";
import "dotenv/config";
import Hello from "./hello.js";
import session from "express-session";
import CourseRoutes from "./Courses/routes.js";
import UserRoutes from "./users/routes.js";
import QuizRoutes from "./quizzes/routes.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import mongoose from "mongoose";
import ModuleRoutes from "./Modules/routes.js";
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
QuizRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);