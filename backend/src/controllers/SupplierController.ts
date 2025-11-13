import { Request, Response } from 'express';
import prisma from '../config/database';

export const getSuppliers = async (req: Request, res: Response) => {
  const suppliers = await prisma.supplier.findMany();
  res.json(suppliers);
};

export const createSupplier = async (req: Request, res: Response) => {
  const supplier = await prisma.supplier.create({ data: req.body });
  res.json(supplier);
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.supplier.delete({ where: { id } });
  res.json({ message: 'Fornecedor deletado' });
};
