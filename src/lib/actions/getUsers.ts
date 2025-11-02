'use server';

import prisma from "../db/prisma";

export const getUserAction = async()=>{
    try {
        const user = await prisma.user.findMany();
        return user
    } catch (error) {
        console.log(error);
        
    }
}