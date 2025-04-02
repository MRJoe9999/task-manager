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