import { Request, Response } from "express"
import { query } from "../config/db"
import { User } from "../types";


// CREATE
export const createUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // TODO: No user duplicate?

    try {
        // const result = await query<User[]>(
        //     "INSERT INTO users (username, password) VALUES (?, ?)",
        //     [username, password]
        // );

        // // TODO: Kolla på result.affectedRows om den är true

        // res.status(201).json({message: "User created successfully"});

        // TODO: Write CRUD with prisma
        // https://www.prisma.io/docs/orm/prisma-client/queries/crud

    } catch(error) {

        res.status(500).json({error: "Internal server error"});
    }

};

// READ ONE
export const getUser = async (req: Request, res: Response) => {

    // Hämta url-parameter
    const { id } = req.params;
    try {
        const result = await query<User[]>(
            "SELECT * FROM users WHERE id = ?",
            [id]
          );

          // TODO: Om användaren inte hittas

          res.status(200).json({message: "User fetched successfuly", user: result[0]});

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

}


// READ MANY
export const getUsers = async (req: Request, res: Response) => {

    try {
        const result = await query<User[]>(
            "SELECT * FROM users",
            []
          );

          res.status(200).json({message: "Users fetched successfuly", user: result});

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

};


// UPDATE 
export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params; // URL-parameter
    const { username, password } = req.body; // Data som skickas via body (som i formulär)

    
    try {
        const result = await query<User[]>(
            "UPDATE users SET username = ?, password = ? WHERE id = ? ",
            [username, password, id]
          );

          // TODO: Om användaren inte hittas 

          res.status(200).json({message: "User updated successfuly"});

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }


};


// DELETE
export const deleteUser = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {
            const result = await query<void> (
                "DELETE FROM users WHERE id = ?",
                [id]
              );
    
              // TODO: Om användaren inte hittas
 
    
              res.status(200).json({message: "User deleted successfully"});
    
        } catch(error) {
            res.status(500).json({error: "Internal server error"});
        }





};

