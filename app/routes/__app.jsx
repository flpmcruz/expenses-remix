// Esta es una sintaxis especial donde podemos agrupar componentes para que compartan cierto contexto, estilos, layouts, etc.

// Es importante que tenga el __ como prefijo tanto la carpeta que agrupa a las paginas como el componente que la representa, el cual tiene que llamarse igual. Esto es conocido como pathless

import { Outlet } from '@remix-run/react'

import expensesStyles from '~/styles/expenses.css'
import ExpensesHeader from '~/components/navigation/ExpensesHeader'

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader/>
      <Outlet/>
    </>
  )
}

export function links() {
    return [{ rel: 'stylesheet', href: expensesStyles}]
}

//Add my own headers to this page, routes child can access this using parentHeaders
export function headers() {
  return {
    'Cache-Control': 'max-age=3600', //60min
  }
}