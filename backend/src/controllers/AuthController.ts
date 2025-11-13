import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role }
  });
  
  res.json({ id: user.id, name: user.name, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, 'Password:', password);
  
  const user = await prisma.user.findUnique({ where: { email } });
  console.log('User found:', user ? 'Yes' : 'No');
  console.log('Stored password hash:', user?.password);
  
  if (!user) {
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log('Password match:', passwordMatch);
  
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};
