import { Router } from "express";
import { createStudent } from "../Controllers/studentController.js";
const routes = Router();

routes.post('/user/', createStudent)



export default routes;




