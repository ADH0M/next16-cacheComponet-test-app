"use server";

import { cookies } from "next/headers";
import prisma from "../db/prisma";
import { userSchema } from "../schema";

export type RegisterType = {
  username?: string;
  password?: string;
  email?: string;
  ms?: string;
};

export type SignType = {
  password?: string;
  email?: string;
  ms?: string;
};

export const signInAciton = async (
  initalState: SignType,
  formDate: FormData
) => {
  const errors: SignType = {};
  const password = formDate.get("password") as string;
  const email = formDate.get("email") as string;

  const zValid = userSchema.safeParse({ email, password });

  if (!zValid.success) {
    zValid.error.issues.forEach((input) => {
      const path = input.path[0];
      if (typeof path === "string") {
        errors[path as keyof SignType] = input.message;
      }
    });
  }
  const errorsKey = Object.keys(errors);
  if (errorsKey.length > 1) {
    errors.ms = "invaild field";
    return errors;
  }

  try {
    const createUser = await prisma.user.findUnique({ where: { email } });
    if (!createUser) {
      return { ms: "your emial not existed " };
    }

    const pass = createUser.password;
    if(pass !== password){
      return {ms :'your email or password is uncorected'}
    }
    

    const cookeStore = await cookies();
    cookeStore.set("user", JSON.stringify(createUser));

    return { ms: "create user is succesful" };
  } catch (error: unknown) {
    console.log(error);
    errors.ms = "server error ";
    return errors;
  }
};

export const registerAction = async (
  initalState: RegisterType,
  formDate: FormData
) => {
  const errors: RegisterType = {};
  const username = formDate.get("name") as string;
  const password = formDate.get("password") as string;
  const email = formDate.get("email") as string;

  console.log(username.length, username.length < 3);

  const zValid = userSchema.safeParse({ username, email, password });
  if (!zValid.success) {
    zValid.error.issues.forEach((input) => {
      const path = input.path[0];

      if (typeof path === "string") {
        errors[path as keyof RegisterType] = input.message;
      }
    });
    console.log(errors);
  }

  const errorsKey = Object.keys(errors);
  if (errorsKey.length > 1) {
    errors.ms = "invaild field";
    return errors;
  }

  try {
    const createUser = await prisma.user.create({
      data: {
        email,
        name: username,
        password,
      },
    });

    const cookeStore = await cookies();
    cookeStore.set("user", JSON.stringify(createUser));

    return { succes: true, ms: "create user is succesful" };
  } catch (error: unknown) {
    console.log(error);
    errors.ms = "server error ";
    return errors;
  }
};
