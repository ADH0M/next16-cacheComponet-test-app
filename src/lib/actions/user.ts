"use server";
import { cookies } from "next/headers";
import prisma from "../db/prisma";
import { notFound, redirect } from "next/navigation";

export const checkUser = async (
  id: string,
  email: string,
  password: string
) => {
  try {
    const createUser = await prisma.user.findUnique({
      where: { email, id, password },
    });
    if (createUser) {
      return true;
    } else {
      const cookieStore = await cookies();
      cookieStore.delete("user");
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return false;
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("user");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return false;
  }
};

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } ,select:{
      id:true,name:true,email:true,password:false
    }});
    if (!user) {
      notFound();
    }
    return user;
  } catch (error) {
    throw new Error("server error");
  }
};
