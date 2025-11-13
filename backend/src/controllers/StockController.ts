import { Request, Response } from 'express';
import prisma from '../config/database';

export const stockEntry = async (req: Request, res: Response) => {
  const { productId, quantity, reason } = req.body;
  
  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: productId },
      data: { stock: { increment: quantity } }
    });
    
    await tx.stockMovement.create({
      data: { productId, type: 'entry', quantity, reason }
    });
  });
  
  res.json({ message: 'Entrada registrada' });
};

export const stockExit = async (req: Request, res: Response) => {
  const { productId, quantity, reason } = req.body;
  
  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } }
    });
    
    await tx.stockMovement.create({
      data: { productId, type: 'exit', quantity, reason }
    });
  });
  
  res.json({ message: 'Saída registrada' });
};

export const getMovements = async (req: Request, res: Response) => {
  const movements = await prisma.stockMovement.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(movements);
};
