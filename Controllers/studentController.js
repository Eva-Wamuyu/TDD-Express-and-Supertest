import { DB } from "../DBHelpers/index.js";

export const createStudent = async(req,res)=>{
    try {
        const {adm_no, full_name,student_class, fees_balance} = req.body;



        await DB.exec("uspAddStudent",
        {adm_no, full_name, student_class, fees_balance});
       

        return res.status(201).json(
            {
                status: 'success',
                message: 'Student Added Student'
            }
        )

       
    } catch (error) {
        if (error.number == 2627) {
            return res.status(409).json(
                {

                    error: "Student with that adm already exist"
                }
            )

        }
        return res.status(500).json(
            
            {
                status: "error",
                body: "Error adding notebook"
            }
        )
    }



}



