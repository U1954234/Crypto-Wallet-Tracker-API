// Simple in-memory blacklist
export const tokenBlacklist = new Set<string>();

export function blacklistToken(token: string) {
    tokenBlacklist.add(token);
}

export function isTokenBlacklisted(token: string): boolean {
    return tokenBlacklist.has(token);
}
