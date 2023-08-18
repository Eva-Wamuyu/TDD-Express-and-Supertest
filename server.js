import express  from "express";
import routes from "./Routes/studentRoutes.js";

const app = express();

app.use(express.json());

const PORT = 3000;


app.use(routes)


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})


export default app;