# BASE DE DATOS
# CONVEX (Part 1)
1. Vamos a [https://www.convex.dev/] y nos logueamos
2. Tocamos en 'Create Proyect' y le definimos un nombre
3. Instalamos convex ► `npm install convex`
4. Instalamos convex dev ► `npx convex dev`
   - Device name → enter
   - Open browser → yes
   - Confirmamos en el buscador
   - Configure → a new proyect
   - Proyect name → notion-clone
   - Hacemos click en el link
   - *Nota: No apagar la terminal*
   - *Nota: se crea la carpeta convex y dos vde en el .env.local*

# AUTENTICACION
# CLERK
1. Vamos a [https://dashboard.clerk.com/]
2. Tocamos en 'add aplication'
3. Le definimos un nombre (notion-clone) y un proveedor, en este caso github
4. Copiamos las dos vde que nos brinda al crear la aplicacion y lo pegamos en el `.env.local`
5. En Clerk vamos a 'JWT Templates'
6. Tocamos en 'add template' y seleccionamos 'convex'
7. Copiamos el *issuer* y tocamos en 'apply changes'
8. Creamos el archivo `convex/auth.config.js` y pegamos lo que nos brinda la siguiente doc [https://docs.convex.dev/auth/clerk]
9. En el 'domain' pegamos el issuer que copiamos anteriormente

# CONVEX (Part 2)
1. Instalamos clerk ► `npm install @clerk/clerk-react`
2. Creamos el provider *ConexProvider* ► `components/providers/clerk-provider.tsx`
3. Envolvemos el ThemeProvider en el ConvexClientiProvider ► `app/layout.tsx`
4. Creamos el componente *Spinner* ► `components/spinner.tsx`
5. Agregamos el boton para loguearnos ► `app/(marketng)/_components/navbar.tsx`