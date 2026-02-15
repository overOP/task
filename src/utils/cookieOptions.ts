import { CookieOptions } from "express";

export const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 5 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production" ? "strict" : "lax",
};

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production" ? "strict" : "lax",
};