"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtExpiration = exports.jwtSecret = void 0;
exports.jwtSecret = process.env.JWT_SECRET || 'default-secret-key';
exports.jwtExpiration = process.env.JWT_EXPIRATION || '24h';
