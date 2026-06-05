import { SignJWT, jwtVerify, JWTPayload } from 'jose';

function getSecret(): Uint8Array {
  const s = process.env.JWT_SECRET || 'fallback_secret_change_me_in_production';
  return new TextEncoder().encode(s);
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}
