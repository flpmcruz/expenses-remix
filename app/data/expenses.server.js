import { prisma } from "./database.server";

export async function addExpense({ title, amount, date }, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title,
        amount: +amount,
        date: new Date(date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    throw new Error("Failed to create expense");
  }
}

export async function getExpenses(userId) {
  if(!userId) {
    throw new Error("Failed to get expenses");
  }

  try {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  } catch (error) {
    throw new Error("Failed to get expenses");
  }
}

// export async function getExpense(id) {
//   try {
//     return await prisma.expense.findFirst({ where: { id } });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function updateExpense(id, { title, amount, date }) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title,
        amount: +amount,
        date: new Date(date),
      },
    });
  } catch (error) {
    throw new Error("Failed to update expense");
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({ where: { id } });
  } catch (error) {
    throw new Error("Failed to delete expense");
  }
}
