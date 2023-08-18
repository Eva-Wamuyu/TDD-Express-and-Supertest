import request from "supertest";
import app from "../server";

const req = {
    "adm_no": "770606",
    "full_name": "Halley Quin",
    "student_class": "7",
    "fees_balance": 0
}

describe("STUDENT CONTROLLER",()=>{
    it("should create a new student", async()=>{
        const adm = JSON.parse(Math.floor(Math.random() * 10000) + 90000);
        const req = {
            "adm_no": adm,
            "full_name": "Halley Quin",
            "student_class": "7",
            "fees_balance": 0
        }
        
        const res = await request(app).post('/user').send(req)

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Student Added successfully');

    })

    it("should show appropriate message if student with that id exists already", async()=>{
        
        const res = await request(app).post('/user/').send(req);

        expect(res.status).toBe(409);
        expect(res.body.error).toBe('Student with that adm already exist');

    })


    it("should fetch one student details", async()=>{
    
        const res = await request(app).get(`/user/${req.adm_no}`)

        expect(res.status).toBe(200);
        
        expect(res.body.students[0]).toEqual(
            expect.objectContaining({
                adm_no: expect.any(String),
                name: expect.any(String),
                class: expect.any(String),
                fees_balance: expect.any(Number),
            })
        );

    })

    it('should fetch all students',async()=>{
        const res = await request(app).get('/user/');
        expect(res.status).toBe(200);

    })

    it('should return appropriate error when no students found',async()=>{
        const res = await request(app).get('/user/');
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Students not found');
        
    })

    it('should return appropriate error when student with that adm is not found',async()=>{
       
        const adm_no = '001'
        const res = await request(app).get(`/user/${adm_no}`)
        
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Student with that adm not found');
        
    })

    it("should soft delete a student", async()=>{

        const adm_no = '90606'
        const res = await request(app).delete(`/user/${adm_no}`)

        expect(res.status).toBe(204);
        expect(res.body.message).toBe('Student deleted successfully');

    })

    it("should update a students fees balance", async()=>{
        const req = {
            "adm_no": "770606",
            "fees_balance": 45
        }
        const res = await request(app).patch(`/user/${req.adm_no}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Fees Updated successfully');

    })

    






})