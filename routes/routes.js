import express from "express";
import { get } from "http";
import path from "path";
import { getTasks, postTask, updateTask, deleteTask } from "../controllers/controllers.js";

const router = express.Router();


router.get("/json", getTasks); 

router.get('/', getTasks);

router.post('/add-task', postTask);
router.put("/toggle-task/:id", updateTask);


router.delete('/delete-task/:id', deleteTask);

export default router;