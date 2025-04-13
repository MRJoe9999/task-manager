import { getAlltasks, addTasks, update, deleteTasks } from "../models/subscriberModels.js";

export const getTasks = async (req, res) => {  
    try{
        const error = req.query.error;
        const tasks = await getAlltasks();

        
        tasks.sort((a, b) => {
            if (a.completed === b.completed) return 0; 
            return a.completed ? 1 : -1; 
        });
        res.render("task", {tasks, error});

    }
    catch(error){
        console.error(error);
        res.status(500).send("An error occurred while fetching tasks");
    }
};

export const postTask = async (req, res) => {   
    const {task, description} = req.body;
    const tasks = await getAlltasks();
    if(!task || task.length < 3){
        return res.render("task", { 
            error: "Task is required and must be longer than three characters.",
            tasks,
        });

    }
    if (task.length > 100) {
        return res.render("task", { 
            error: "Task cannot exceed 100 characters.",
            tasks,
        });

    }
    if (description && description.length > 500) {
        return res.render("task", { 
            error: "Description cannot exceed 500 characters.",
            tasks,
        });

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

export const updateTask = async (req, res) => {
    const { id } = req.params;
    console.log("PUT route hit, id:", id); 
    try {
        await update(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update task" });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    console.log("DELETE route hit, id:", id); 
    try {
        await deleteTasks(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete task" });
    }
}