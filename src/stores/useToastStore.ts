import {create} from "zustand"

type Toast = {
    title: string,
    description?: string,
    type?: "surface" | "danger" | "warning" | "success",
} | null

interface ToastStore {
    toast: Toast
    setToast: (toast: Toast) => void
}

export const useToastStore  = create<ToastStore>((set) => ({
    toast: null,
    setToast: (toast) => set(({toast}))
}))