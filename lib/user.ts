import { JwtPayload } from "@supabase/supabase-js";
import { Profile } from "@/types";
import prisma from "./prisma";

/**
 * Retrieves the user profile from the database
 * @param user Supabase user
 */
export async function getUserProfile(user: JwtPayload | undefined): Promise<Profile | null> {
  if (!user) {
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.sub,
    }
  })

  return profile;
}

/**
 * Retrieves the short name from the user profile
 * @param profile User profile
 */
export const getShortNameFromProfile = (profile: Profile | null) =>
  profile?.name?.split(" ")[0]
