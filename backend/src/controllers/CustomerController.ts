import { Request, Response } from 'express';
import prisma from '../config/database';

export const getCustomers = async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
};

export const createCustomer = async (req: Request, res: Response) => {
  const customer = await prisma.customer.create({ data: req.body });
  res.json(customer);
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.customer.delete({ where: { id } });
  res.json({ message: 'Cliente deletado' });
};
