# PAGE 
# SIDEBAR Y NAVBAR
2. Creamos el *MainLayout* ► `app/(main)/layout.tsx`
3. Instalamos useHooks → `npm i usehooks-ts`
4. Creamos el componente *Navigation* ► `app/(main)/_components/navigation.tsx`
5. Usamos el Navigation en el *MainLayout* ► `app/(main)/layout.tsx`

# DOCUMENT PAGE
1. Creamos el DocumentPage ► `app/(main)/(routes)/documents/page.tsx`

# ACTIONS ITEMS
1. Aplicamos cambios en el componente *DropdownMenu* ► `components/ui/dropdown-menu.tsx`
2. Creamos el componente UserItem ► `app/(main)/_components/user-item.tsx`
3. Usamos el UserItem en el *Navigation* ► `app/(main)/_components/navigation.tsx`

# SIDEBAR ITEMS
1. Creamos el componente *Item* ► `app/(main)/_components/item.tsx`
2. Usamos el Item en el *Navigation* ► `app/(main)/_components/navigation.tsx`
3. Usamos la funcion para crear un nuevo doc en el *Navigation* ► `app/(main)/_components/navigation.tsx`

# DOCUMENT LIST
1. Creamos el componente *DocumentList* ► `app/(main)/_components/document-list.tsx`
2. Usamos el DocumentList en el *Navigation* ► `app/(main)/_components/navigation.tsx`

# TRASH BOX
1. Aplicamos cambios en el popover component ► `components/ui/popover.tsx`
2. Creamos el componente *TrashBox* ► `app/(main)/_components/trash-box.tsx`
3. Usamos el TrashBox en el *Navigation* ► `app/(main)/_components/navigation.tsx`
4. Aplicamos cambios en el alert-dialog component ► `components/ui/alert-dialog.tsx`
5. Creamos el componente *ConfirmModal* ► `components/modals/confirm-modal.tsx`
6. Usamos el ConfirmModal en el *TrashBox* ► `app/(main)/_components/trash-box.tsx`
