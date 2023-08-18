import { DB } from "../DBHelpers/index.js";

export const createStudent = async(req,res)=>{
    try {
        const {adm_no, full_name,student_class, fees_balance} = req.body;



        await DB.exec("uspAddStudent",
        {adm_no, full_name, student_class, fees_balance});
       

        return res.status(201).json(
            {
            
                message: 'Student Added successfully'
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
    
                error: "Error adding student"
            }
        )
    }



}


export const getStudent = async(req,res) => {
    try {
        const adm_no = req.params.adm_no;
        let response = await DB.exec('uspGetStudentDetails',{adm_no});
        
        console.log(adm_no)
        if(response.recordset.length == 0){
            return res.status(404).json(
                {
                    error: "Student with that adm not found"
                })
        }
        return res.status(200).json(
            {
                status: "success",
                students: response['recordset']
            }
        )
        
    } catch (error) {
        console.log(error)
        return res.status(404).json(
            {

                error: "Student with that adm not found"
            }
        )
    
    }
    
    

}

export const getAllStudents = async(req,res) => {
    try {

        let response = await DB.exec('uspGetAllStudentDetails');
        

        return res.status(200).json(
            {
                status: 'success',
                students: response['recordset']
            }
        )
        
    } catch (error) {
        
        return res.status(404).json(
            {
                error: "Students not found"
            }
        )
        
    }

}



export const deleteStudent = async (req, res) => {
    try {

        const adm_no = req.params.adm_no;
        let response = await DB.exec('uspDeleteStudent',{adm_no});

        return res.status(204).json(
            {
                message: "Student deleted successfully"
            }
        )


        
    } catch (error) {

        return res.status(404).json(
            {
    
                error: "Error Deleting"
            }
        )

        
    }

}
