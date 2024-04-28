"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlacklisted = exports.blacklistToken = exports.tokenBlacklist = void 0;
// Simple in-memory blacklist
exports.tokenBlacklist = new Set();
function blacklistToken(token) {
    exports.tokenBlacklist.add(token);
}
exports.blacklistToken = blacklistToken;
function isTokenBlacklisted(token) {
    return exports.tokenBlacklist.has(token);
}
exports.isTokenBlacklisted = isTokenBlacklisted;
