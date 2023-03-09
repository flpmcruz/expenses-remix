// Esta es una sintaxis especial donde podemos agrupar componentes para que compartan cierto contexto, estilos, layouts, etc.

// Es importante que tenga el __ como prefijo tanto la carpeta que agrupa a las paginas como el componente que la representa, el cual tiene que llamarse igual. Esto es conocido como pathless

import { Outlet } from '@remix-run/react'

import MainHeader from '~/components/navigation/MainHeader'
import { getUserFromSession } from '~/data/auth.server'
import marketingStyles from '~/styles/marketing.css'

export default function MarketingLayout() {
  return (
    <>
        <MainHeader/>
        <Outlet/>
    </>
  )
}

export function loader({request}) {
  return getUserFromSession(request)
}

export function links() {
    return [{ rel: 'stylesheet', href: marketingStyles}]
}

//Add my own headers to this page
export function headers() {
  return {
    'Cache-Control': 'max-age=3600', //60min
  }
}