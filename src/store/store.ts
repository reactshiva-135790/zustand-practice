import {create} from "zustand";
import { devtools, persist } from 'zustand/middleware'

interface HabitStore {
   id: string;
   name: string;
   frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
   completeDates: string[];
   createDate: Date;
}

const useHabitStore = create(persist(devtools((set) =>{
    return {
        habits: [] as HabitStore[],
        photos: [] as any[],
        photosLoading: false,
        photosError: null as string | null,
        addHabit:(habit: Omit<HabitStore, 'id' | 'completeDates' | 'createDate'>) => {
            const newHabit: HabitStore = {
                id: Date.now().toString(),
                name: habit.name,
                frequency: habit.frequency,
                completeDates: [],
                createDate: new Date()
            }
            set((state: { habits: any; }) => ({habits: [...state.habits, newHabit]}))
        }
        ,
        removeHabit: (id: string) => {
            set((state: { habits: HabitStore[] }) => ({ habits: state.habits.filter(h => h.id !== id) }))
        },
        toggleComplete: (id: string, dateStr?: string) => {
            const dateKey = dateStr || new Date().toISOString().split('T')[0]
            set((state: { habits: HabitStore[] }) => ({
                habits: state.habits.map(h => {
                    if (h.id !== id) return h
                    const has = h.completeDates.includes(dateKey)
                    return {
                        ...h,
                        completeDates: has ? h.completeDates.filter(d => d !== dateKey) : [...h.completeDates, dateKey]
                    }
                })
            }))
        } ,
        fetchPhotos: async (limit = 24) => {
            set((s: any) => ({ photosLoading: true, photosError: null }))
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/photos')
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                // take a manageable subset
                const list = Array.isArray(data) ? data.slice(0, limit) : []
                set((s: any) => ({ photos: list, photosLoading: false }))
            } catch (err: any) {
                set((s: any) => ({ photosError: err?.message || String(err), photosLoading: false }))
            }
        }
        ,
        clearPhotos: () => {
            set((s: any) => ({ photos: [] }))
        }

    }
}, { name: 'habit-store' }), { name: 'habit-storage' }))

export default useHabitStore;