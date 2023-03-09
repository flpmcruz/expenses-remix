// /expenses/<some-id>
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import Modal from "~/components/util/Modal";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import { validateExpenseInput } from "~/data/validation.server";
import { updateExpense, deleteExpense } from "~/data/expenses.server";
//import { getExpense } from "~/data/expenses.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({params}) {
//   const { id } = params
//   return await getExpense(id)
// }

//Usando un mismo action para diferentes acciones
export async function action({ params, request }) {
  const { id } = params;

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    //validation
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(id, expenseData);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(id);
    return { deleteId: id };
  }
}

//Adding dynamic meta data
export function meta({ params, location, data, parentsData }) {
  const expense = parentsData["routes/__app/expenses"].find(
    (expense) => expense.id === params.id
  );
  return {
    title: expense.title,
    description: "Update expense",
  };
}
