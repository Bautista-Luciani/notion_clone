# DOCUMENT ID PAGE
1. Trabajamos en el *DocumentIdPage* ► `app/(main)/(routes)/documents/[documentId]/page.tsx`
2. Instalamos emoji-picker-react ► `npm i emoji-picker-react`
3. Instalamos textarea-autosize ► `npm i react-textarea-autosize`
4. Creamos un endpoint para eliminar el icono ► `convex/documents.ts`
5. Creamos el componente *Toolbar* ► `components/toolbar.tsx`
6. Creamos el componente *IconPicker* ► `components/icon-picker.tsx`
7. Usamos el IconPicker en el *Toolbar* ► `components/toolbar.tsx`
8. Usamos el Toolbar en el *DocumentIdPage* ► `app/(main)/(routes)/documents/[documentId]/page.tsx`
9. Creamos el hook *useCoverImage* ► `hooks/use-cover-image.tsx`
10. Creamos el componente *CoverImageModal* ► `components/modals/cover-image-modal.tsx`
11. Agregamos el CoverImageModal al *ModalProvider* ► `components/providers/modal-provider.tsx`
12. Usamos el useCoverImage en el *Toolbar* ► `components/toolbar.tsx`
13. Trabajamos con edgestore para subir las imagenes ► 
    - Vamos a [https://edgestore.dev/]
    - Tocamos 'start for free' y nos creamos una cuenta, en este caso lo voy a hacer con github
    - Tocamos en 'New project' y le definimos un nombre, en este caso notion-clone
    - Copiamos las dos vde que nos brinda y las pegamos en el archivo '.env.local'
    - Tocamos en 'Continue in the docs' y seguimos los pasos:
        - Instalamos edge store ► `npm install @edgestore/server @edgestore/react zod`
        - Configuramos el backend creando todas las carpetas en el mismo orden en que las definen y luego pegando dentro el codigo que nos brindan ► `app/api/edgestore/[...edgestore]/route.ts`
        - Configuramos el frontend creando todas las carpetas en el mismo orden en que las definen y luego pegando dentro el codigo que nos brindan ► `lib/edgestore.ts`
        - Agregamos el EdgeStoreProvider en el *RootLayout* ► `app/layout.tsx`
    - Tocamos en 'Components' ► 'Image' y seguimos los pasos para crear un componente y manejar toda la  logica dentro del componente: 
        - Instalamos las siguientes dependencias ► `npm install tailwind-merge react-dropzone lucide-react`
        - Creamos el componente *SingleImageDropzone* y pegamos el codigo que nos brinda ► `components/single-image-dropzone.tsx`
        - Aplicamos unos cambios al *SingleImageDropzone* ► `components/single-image-dropzone.tsx`
    - En la doc vamos a 'Quick start' ► 'Delete file' para saber como eliminar una imagen:
        - Vamos a la siguiente doc que nos brinda y seguimos los pasos: [https://edgestore.dev/docs/configuration#lifecycle-hooks]
        - Agregamos el '.beforeDelete' dentro del *edgeStoreRouter* ► `app/api/edgestore/[...edgestore]/route.ts`
        - Volvemos al 'Delete file' y usamos el codigo que nos brinda para eliminar una imagen en el *Cover* ► `components/cover.tsx`
    - En la doc vamos a 'Quick start' ► 'Replace file' para saber como reemplazar una imagen:
        - Agregamos el codigo que nos brinda dentro del *CoverImageModal* ► `components/modals/cover-image-modal.tsx`
    - Usamos el *useEdgeStore* y el *SingleImageDropzone* en el *ConverImageModal* para la carga de imagenes ► `components/modals/cover-image-modal.tsx`
14. Creamos un endpoint para eliminar la imagen ► `convex/documents.ts`
15. Creamos el componente *Cover* ► `components/cover.tsx`
16. Usamos el Cover en el *DocumentIdPage* ► `app/(main)/(routes)/documents/[documentId]/page.tsx`
    