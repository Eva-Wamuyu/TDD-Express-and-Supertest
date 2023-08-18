import { Router } from "express";
import { createStudent,getStudent,getAllStudents,deleteStudent } from "../Controllers/studentController.js";
const routes = Router();

routes.post('/user/', createStudent)
routes.get('/user/:adm_no', getStudent)
routes.get('/user/',getAllStudents)
routes.delete('/user/:adm_no', deleteStudent)



export default routes;




