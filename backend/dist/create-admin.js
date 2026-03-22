"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const email = 'admin@dhac.com';
    const plainPassword = 'admin';
    const name = 'Super Admin';
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        if (existing.role !== 'ADMIN') {
            await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
            console.log('El usuario admin@dhac.com ya existía y fue asegurado como ADMIN.');
        }
        else {
            console.log('El usuario admin@dhac.com ya existe y ya tiene privilegios ADMIN.');
        }
        return;
    }
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const adminUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: 'ADMIN',
        },
    });
    console.log(`\n================================`);
    console.log(`Usuario administrador creado exitosamente:`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Contraseña: ${plainPassword}`);
    console.log(`================================\n`);
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=create-admin.js.map