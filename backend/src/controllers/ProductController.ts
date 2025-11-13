import { Request, Response } from 'express';
import prisma from '../config/database';

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: { category: true, supplier: true }
  });
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock, categoryId, supplierId } = req.body;
  const product = await prisma.product.create({
    data: { name, price, stock, categoryId, supplierId }
  });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: req.body
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id } });
  res.json({ message: 'Produto deletado' });
};
