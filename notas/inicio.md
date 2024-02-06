# ENVIROMENT SETUP
1. Creamos el proyecto → `npm create-next-app@latest notion-clone`
2. Configuramos el proyecto:
   - TypeScript ► yes
   - ESlint ► yes
   - Tailwind CSS ► yes
   - src/ directory ► no
   - App Router ► yes
   - import alias ► no
3. Inicializamos shadcn ui → `npx shadcn-ui@latest init`
4. Configuramos shadcn ui:
   - TypeScript ► yes
   - style ► default
   - base color ► neutral
   - global CSS ► app/global.css
   - CSS variables ► yes
   - tailwind.config.js ► tailwind.config.ts
   - components ► @/components
   - utils ► @/lib/utils
   - React Server Components ► yes
   - components.json ► yes
5. Agregamos la altura del 100% al html, body y root ► `app/globals.css`
6. Cambiamos el metadata ► `app/layout.tsx`
7. Corremos la aplicacion ► `npm run dev`
