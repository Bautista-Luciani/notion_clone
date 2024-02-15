# DEPLOYMENT
1. Vamos a [https://docs.convex.dev/production/hosting/vercel] y seguimos los pasos:
2. Vamos a Vercel: [https://vercel.com/bautistas-projects] ►
   - Tocamos en 'Add new' ► 'proyect'
   - Importamos el repositorio
   - Definimos un nombre (que en lo posible no incluya el nombre de la aplicacion real para evitar errores)
   - Tocamos en 'Build and Output Settings' y habilitamos la opcion de 'Build command'
   - Reemplazamos el comando por `npx convex deploy --cmd 'npm run build'`
   - Copiamos todas las vde del archivo `.env.local` y lo pegamos en 'Enviroment Variables'
   - Vamos al proyecto en Convex [https://dashboard.convex.dev/t/bautista-luciani/notion-clone-3ba30/blissful-avocet-766/data?table=documents] y lo cambiamos a 'production'
   - Vamos a 'Settings' ► 'URL and Deploy Key':
       - Copiamos la 'Deployment URL' y reemplamos la vde 'NEXT_PUBLIC_CONVEX_URL' por esa url
       - Copiamos la 'Deploy Key' y reemplamos la vde 'CONVEX_DEPLOYMENT' por esa url
   - Agregamos la vde 'CONVEX_DEPLOY_KEY' y le pegamos el 'Deploy Key'
