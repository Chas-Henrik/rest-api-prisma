import { Request, Response } from "express"
import { query } from "../config/db"
import { User } from "../types";

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

// CREATE
export const createUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // TODO: No user duplicate?

    try {
        const user = await prisma.users.create({
            data: {
                username: username,
                password: password,
            },
        })

        res.status(201).json({message: "User created successfully", result: user});
    } catch(error) {

        res.status(500).json({error: "Internal server error"});
    }

};

// READ ONE
export const getUser = async (req: Request, res: Response) => {

    // Hämta url-parameter
    const { id } = req.params;
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if(!user) {
            res.status(404).json({error: "User not found"});
            return;
        }

        res.status(200).json({message: "User fetched successfully", user: user});
    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

}


// READ MANY
export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await prisma.users.findMany();

        res.status(200).json({message: "Users fetched successfully", users: users});

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

};


// UPDATE 
export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params; // URL-parameter
    const { username, password } = req.body; // Data som skickas via body (som i formulär)

    try {
        const updateUser = await prisma.users.update({
            where: {
                id: parseInt(id),
            },
            data: {
                username: username,
                password: password,
            },
        })

        res.status(200).json({message: "User updated successfully", updateUser: updateUser});

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }


};


// DELETE
export const deleteUser = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {
            const deleteUser = await prisma.users.delete({
                where: {
                    id: parseInt(id),
                },
            })
    
            res.status(200).json({message: "User deleted successfully", deleteUser: deleteUser});

        } catch(error) {
            res.status(500).json({error: "Internal server error"});
        }

};

