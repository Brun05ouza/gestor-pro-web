import { Request, Response } from 'express';
import prisma from '../config/database';

export const salesReport = async (req: Request, res: Response) => {
  const sales = await prisma.sale.findMany({
    include: { items: { include: { product: true } } }
  });
  
  const total = sales.reduce((sum, sale) => sum + sale.total, 0);
  const count = sales.length;
  
  res.json({ total, count, sales });
};

export const stockReport = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: { category: true }
  });
  
  const lowStock = products.filter(p => p.stock < 10);
  
  res.json({ products, lowStock });
};
