import { getAlltasks, addTasks } from "../models/subscriberModels.js";

export const getTasks = async (req, res) => {  
    try{
        const tasks = await getAlltasks();
        res.json(tasks);

    }
    catch(error){
        console.error(error);
        res.status(500).send("An error occurred while fetching tasks");
    }
};

export const postTask = async (req, res) => {   
    const {task, description} = req.body;
    if(!task || task.length < 3){
        return res.status(400).send("Task is requied to be longer than three characters");

    }
    if (task.length > 100) {
        return res.status(400).send("Task title cannot exceed 100 characters.");
    }
    if (description && description.length > 500) {
        return res.status(400).send("Description cannot exceed 500 characters.");
    }
    try{
        const newTask = await addTasks(task, description);
      
        res.redirect("/");
    }
    catch(error){
        if(error.code === "23505"){
            return res.status(500).send("An error occurred during the task creation");
        }
    }

}