/**
 * Decodes a JWT token and extracts its payload.
 * @param token - The JWT token to decode.
 * @returns The decoded payload as an object, or null if decoding fails.
 */
export function decodeJwt<T = Record<string, unknown>>(
  token: string
): T | null {
  try {
    const [, payload] = token.split("."); // Extract the payload part of the token
    if (!payload) {
      throw new Error("Invalid token structure");
    }

    // Decode the Base64 payload
    const decodedPayload = atob(payload);

    // Parse and return the JSON payload
    return JSON.parse(decodedPayload) as T;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}
