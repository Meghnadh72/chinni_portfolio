import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-dev-secret-change-me-in-prod"
);

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
