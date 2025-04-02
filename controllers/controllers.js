import { getAlltasks } from "../models/subscriberModels.js";

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