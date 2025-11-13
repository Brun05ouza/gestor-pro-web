import { Request, Response } from 'express';
import prisma from '../config/database';

export const createSale = async (req: Request, res: Response) => {
  const { customerId, items } = req.body;
  
  const sale = await prisma.$transaction(async (tx) => {
    let total = 0;
    
    for (const item of items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        throw new Error('Estoque insuficiente');
      }
      total += product.price * item.quantity;
    }
    
    const newSale = await tx.sale.create({
      data: {
        customerId,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: true }
    });
    
    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }
    
    return newSale;
  });
  
  res.json(sale);
};

export const getSales = async (req: Request, res: Response) => {
  const sales = await prisma.sale.findMany({
    include: { customer: true, items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(sales);
};
