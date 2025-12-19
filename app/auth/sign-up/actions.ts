'use server';

import prisma from "@/lib/prisma";

export async function createProfile(email: string, name: string, userId?: string) {
  await prisma.profile.create({ data: { name, email, userId } });
}
