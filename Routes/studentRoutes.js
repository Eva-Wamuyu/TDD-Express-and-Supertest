import { Router } from "express";
import { createStudent,getStudent,getAllStudents } from "../Controllers/studentController.js";
const routes = Router();

routes.post('/user/', createStudent)
routes.get('/user/:adm_no', getStudent)
routes.get('/user/',getAllStudents)



export default routes;




