import express from "express";
import Hello from "./hello.js";
import CourseRoutes from "./Courses/routes.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import ModuleRoutes from "./Modules/routes.js";
const app = express();
app.use(cors())
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);