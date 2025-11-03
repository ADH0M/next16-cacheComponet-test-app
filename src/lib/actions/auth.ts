"use server";
import * as z from "zod";

import { cookies } from "next/headers";
import prisma from "../db/prisma";

import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("schemaValidation");

  const rigShema = z.object({
    email: z.email(t("emailRequired")),
    password: z
      .string(t("passwordRequired"))
      .min(6, t("passwordTooShort"))
      .max(18, t("passwordTooLong")),
  });

  const zValid = rigShema.safeParse({ email, password });

  if (!zValid.success) {
    zValid.error.issues.forEach((input) => {
      const path = input.path[0];
      if (typeof path === "string") {
        errors[path as keyof SignType] = input.message;
      }
    });
  }
  const errorsKey = Object.keys(errors);
  if (errorsKey.length > 0) {
    return errors;
  }

  try {
    const createUser = await prisma.user.findUnique({ where: { email } });
    if (!createUser) {
      return { ms: "incorrect" };
    }

    const pass = createUser.password;
    if (pass !== password) {
      return { ms: 'incorrect' };
    }

    const cookeStore = await cookies();
    cookeStore.set("user", JSON.stringify(createUser));

    return { ms: "create user is succesful" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errors.ms = "server error ";
    return errors;
  }
};

export const registerAction = async (
  initalState: RegisterType,
  formDate: FormData
): Promise<RegisterType> => {
  const errors: RegisterType = {};
  const username = formDate.get("name") as string;
  const password = formDate.get("password") as string;
  const email = formDate.get("email") as string;
  const t = await getTranslations("schemaValidation");

  const rigShema = z.object({
    username: z
      .string(t("nameRequired"))
      .min(3, t("nameTooShort"))
      .max(15, t("nameTooLong")),
    email: z.email(t("emailRequired")),
    password: z
      .string(t("passwordRequired"))
      .min(6, t("passwordTooShort"))
      .max(18, t("passwordTooLong")),
  });

  const zValid = rigShema.safeParse({ username, email, password });
  if (!zValid.success) {
    zValid.error.issues.forEach((input) => {
      const path = input.path[0];

      if (typeof path === "string") {
        errors[path as keyof RegisterType] = input.message;
        console.log(errors);
      }
    });
  }

  const errorsKey = Object.keys(errors);
  if (errorsKey.length > 1) {
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

    return { ms: "succesful" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errors.ms = "server error";
    return errors;
  }
};
