import express from "express";
import { get } from "http";
import path from "path";
import { getTasks } from "../controllers/controllers.js";

const router = express.Router();


let tasks = [];
let taskid = 1;

router.get("/json", getTasks);

router.get('/', (req, res)=>{
    res.render('task', {tasks});
});

router.post('/add-task', (req, res)=>{
    const {name, description} = req.body;
    if(!name || !description){
        return res.status(400).send("Name and descriptions are required");

    }

    tasks.push({name, description, id: taskid++, completed: false });
    res.redirect('/');
});
router.post('/toggle-task/:id', (req, res)=>{
    const task = tasks.find(t => t.id == req.params.id);
    if(!task) {
        return res.status(400).send("task not found");
        
    }
    task.completed = !task.completed;
    res.redirect('/');
});

router.post('/delete-task/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect('/');
});

export default router;