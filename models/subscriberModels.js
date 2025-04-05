//create me the schema for the subscriber
import {query} from '../config/db.js';

export const getAlltasks = async () =>{
    try{
        const result = await query("SELECT title, description FROM tasks");
        return result.rows;
    }catch(error){
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export const addTasks = async (title, description) =>{
    if(description === ""){
        description = null;
    }
    try{
        const result = await query(
            "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error adding signups:", error);
        throw error;
    }
};

export const update = async (id) => {
    try {
        const result = await query(
            "UPDATE tasks SET completed = true WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error toggling task completion:", error);
        throw error;
    }
};