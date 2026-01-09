"use server";

import * as bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

export const register = async (values: any) => {
  const email = values.email.toLowerCase();
  const password = values.password;
  const name = values.name;

  if (!email || !password || !name) {
    return { error: "Missing required fields." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Identity already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "Membership initialized." };
  } catch (error) {
    console.error("DATABASE_ERROR:", error);
    return { error: "Database synchronization failed." };
  }
};
