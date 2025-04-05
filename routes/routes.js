import express from "express";
import { get } from "http";
import path from "path";
import { getTasks, postTask, updateTask } from "../controllers/controllers.js";

const router = express.Router();


let tasks = [];
let taskid = 1;

router.get("/json", getTasks); 

router.get('/', getTasks);

router.post('/add-task', postTask);
router.put("/tasks/:id", updateTask);


router.post('/delete-task/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect('/');
});

export default router;