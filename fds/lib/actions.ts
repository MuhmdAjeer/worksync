"use server";

import { cookies } from "next/headers";
import xior from "xior";
export const login = async (
  prevState: any,
  user: { email: string; password: string }
) => {
  try {
    // using xior lib because axios wont work in service worker!
    const { data: res } = await xior.post<{ access_token: string }>(
      "http://worksync.test/api/auth/login",
      user
    );

    cookies().set("jwt", res.access_token);
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return { error: "Invalid credentials" };
    }
  }
};
