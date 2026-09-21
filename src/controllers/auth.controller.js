import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';

export async function register(req, res) {
    const { email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return res.status(409).json({ error: 'E-Mail existiert bereits' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, password: hashedPassword } });

    return res.status(201).json({ message: 'User registered successfully' });
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    const passwordValid = user && (await bcrypt.compare(password, user.password));

    if (!passwordValid) {
        return res.status(401).json({ error: 'Ungültige Zugangsdaten' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return res.json({ token });
}