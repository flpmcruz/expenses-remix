import { Form, Link, useActionData, useMatches, useNavigation, /* useLoaderData,  *//* useSubmit */ 
useParams } from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationErrors = useActionData();
  // const expenseData = useLoaderData()

  //Voy a usar este hook 'useMatches' en lugar de useLoaderData, porque esta data ya ha sido obtenida en un loader de una ruta padre, asi no tengo que hacer una doble consulta a la BD
  const params = useParams()
  const matches = useMatches() /* Devuelve un array de rutas desde el root con sus respectivos loaders */
  const espenses = matches.find( match => match.id === 'routes/__app/expenses').data
  const expenseData = espenses.find( expense => expense.id === params.id )

  if(params.id && !expenseData) {
    //invalid id
    return <p>Invalid expense id.</p>
  }

  //Es un hook de remix para decirnos el estado del request cuando usamos su componente Form
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle'

  const defaultValues = expenseData ? {
    title: expenseData.title,
    amount: expenseData.amount,
    date: expenseData.date
  } : {
    title: '',
    amount: '',
    date: ''
  } 

  //es el hook que se usaria si quiero hacer el submit con un onSumit del form y el componente Form de remix
  // const submit =  useSubmit();  submitHandler y preventDefault 
  
  // const submitHandler = (event) => {
  //   event.preventDefault()
  //   //validation

  //   submit(data.target, {
  //     action: '/expenses/add',
  //     method: 'post'
  //   })
  // }

  return (
    <Form 
      method={expenseData ? 'patch' : 'post'} 
      className="form" 
      id="expense-form"
      //onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          required 
          maxLength={30} 
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount} 
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            max={today} 
            required 
            defaultValue={defaultValues.date ? defaultValues.date.slice(0, 10) : ''} 
          />
        </p>
      </div>

      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Expense'}</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
