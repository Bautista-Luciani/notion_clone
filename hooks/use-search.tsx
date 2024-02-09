import { create } from "zustand"

type SearchStore = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    toogle: () => void
}

export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toogle: () => set({ isOpen: !get().isOpen })
}))
