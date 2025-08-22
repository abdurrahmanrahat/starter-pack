"use server";

import { refreshAuthKey } from "@/constants/authKey";
import { cookies } from "next/headers";

export const getRefreshTokenFromCookie = async () => {
  return (await cookies()).get(refreshAuthKey)?.value;
};
