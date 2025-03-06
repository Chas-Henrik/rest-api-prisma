import {Request, Response } from "express"
import { query } from "./../config/db"
import { User, Post } from "./../types"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();  
// CREATE
export const createPostByUser = async (req: Request, res: Response) => {

    const { title, content, userId } = req.body;
    // TODO: När vi har authentisering på plats (JWT) ska vi hämta userId därifrån istället


    try {
        const post = await prisma.posts.create({
            data: {
                user_id: parseInt(userId),
                title: title,
                content: content,
            },
        })

        res.status(201).json({ message: "Post created successfully", post: post})

    } catch(error) {
        res.status(500).json({message: "Internal Server error", error: error});

    }

};

// READ MANY
export const getPostsByUser = async (req: Request, res: Response) => {


    const { userId } = req.body;
    // TODO: ersätt i auth-hantering

    try {
        
        const posts = await prisma.posts.findMany({
            where: {
                user_id: {
                    equals: parseInt(userId),
                },
            },
        })
        if (posts.length === 0) {
            res.status(404).json({error: "Posts not found"});
            return;
        }
        res.status(200).json({message: "Posts fetched successfully", posts: posts});

    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};

// READ ONE
export const getPostByUser = async (req: Request, res: Response) => {

    const { postId } = req.params;
    const { userId } = req.body;   // TODO: ersätt i auth-hantering


    try {

        const post = await prisma.posts.findUnique({
            where: {
                user_id: parseInt(userId),
                id: parseInt(postId),
            },
        });

        if(!post) {
            res.status(404).json({error: "Post not found"});
            return;
        }

        res.status(200).json({message: "Post fetched successfully", post: post})

    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};

// UPDATE
export const updatePostByUser = async (req: Request, res: Response) => {


    const { postId } = req.params;
    const { title, content, userId } = req.body;   // TODO: ersätt i auth-hantering

    try {
        
        const updatedPost = await prisma.posts.update({
            where: {
                user_id: parseInt(userId),
                id: parseInt(postId),
            },
            data: {
                title: title,
                content: content,
            },
        });

        if(!updatedPost) {
            res.status(404).json({error: "Post not found"});
            return;
        }

        res.status(200).json({message: "Post updated successfully", updatedPost: updatedPost})

    } catch(error) {
        res.status(500).json({message: "Internal Server error", error: error});

    }
};

// DELETE
export const deletePostByUser = async (req: Request, res: Response) => {

    const { postId } = req.params;
    const { userId } = req.body;   // TODO: ersätt i auth-hantering

    try {

        const deletePost = await prisma.posts.delete({
            where: {
                user_id: parseInt(userId),
                id: parseInt(postId),
            },
        })

        res.status(200).json({ message: "Post deleted successfully", deletePost: deletePost})
        
    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};