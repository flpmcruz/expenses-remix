
import AuthForm from '~/components/auth/AuthForm'
import { validateCredentials } from '~/data/validation.server'
import { signup, login } from '~/data/auth.server'

import authStyles from '~/styles/auth.css'

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }]
}

export default function AuthPage() {
  return (
    <AuthForm/>
  )
}

export async function action({request}) {

  //De esta forma obtengo los parametros en el backend
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const credentials = Object.fromEntries(formData)

  //validate user input
  try {
    validateCredentials(credentials)
  } catch (error) {
    console.log(error)
    return error
  }

  try {

    if(authMode === 'login') {
      return await login(credentials)
    } else {
      return await signup(credentials)
    }  

  } catch (error) {

    if(error.status === 422) {
      return {credentials: error.message}
    }
    return {credentials: error.message}

  }
}

//Acceder a los headers del padre __app, de esta forma el valor de estos headers esta en un solo lugar, pero puedo añadir otros personificados
export function headers({
  parentHeaders,
  actionHeaders,
  loaderHeaders,
}) {
  return {
    'Cache-Control': parentHeaders.get('Cache-Control') //60min
  }
}