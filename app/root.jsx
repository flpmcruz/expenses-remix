import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from "@remix-run/react";

import Error from "~/components/util/Error";
import sharedStyles from '~/styles/shared.css'

export function links() {
  return [{rel: 'stylesheet', href: sharedStyles}]
} 

export const meta = () => ({
  charset: "utf-8",
  title: "Expenses App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({title, children}) {
  const matches = useMatches()
  const disbaleJS = matches.some(match => match.handle?.disbaleJS)

  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disbaleJS && <Scripts />} {/* desabilitar JS condicionalmente en todo el sitio */}
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet/>
    </Document>
  );
}

export function CatchBoundary() {
  //el hook de remix que captura los errores
  const caughtResponse = useCatch()

  return (
    <Document>
      <main title={caughtResponse.statusText}>
        <Error title={caughtResponse.statusText}>
          <p>{caughtResponse.data?.message || 'Something went wrong. Please try again later'}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </Error>
      </main>
    </Document>
  )
}

export function ErrorBoundary({error}) {
  //el hook de remix que captura los errores emitidos por [throw]

  return (
    <Document>
      <main title="An error ocurred">
        <Error title="An error ocurred">
          <p>{error.message || 'Something went wrong. Please try again later'}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </Error>
      </main>
    </Document>
  )
}