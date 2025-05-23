import { PrismaClient } from '@/generated/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const expenses = await prisma.expense.findMany();
    return res.status(200).json(expenses);
  }

  if (req.method === 'POST') {
    try {
      const { description, amount, category, userId } = req.body;

      const expense = await prisma.expense.create({
        data: {
          description,
          amount: parseFloat(amount),
          category,
          userId,
        },
      });

      return res.status(201).json(expense);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create expense' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}