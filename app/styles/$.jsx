//Esta ruta en especial nos sirve para hacer un router, logica de reedirecciones y comprobar todos los paths que nos entran en las request y no esten definidas en las rutas. Especificamente nos sirve para hacer un 404

//Es un fichero que va en la carpeta de las rutas

//{ '*': 'images/icons/gear.png' }

//Este componente no solo puede ponerse en el root, tambien en las carpetas de rutas anidadas y funcionaria a nivel de esas rutas nada mas

export function loader({params}) {
    console.log(params)
    
    //estandar constructor de respuesta de NodeJs
    throw new Response('Not found', { status: 404 })
  }
  