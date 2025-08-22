"use server";

import { accessAuthKey, accessExpiry } from "@/constants/authKey";
import { cookies } from "next/headers";

export const setAccessTokenToCookie = async (token: string) => {
  const cookieStore = cookies();

  // set to the cookie
  (await cookieStore).set(accessAuthKey, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: accessExpiry,
  });
};
