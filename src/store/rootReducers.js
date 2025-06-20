import home from '@/apis/home/homeSlice'
export const rootReducer = {
  home
}

export type RootState = ReturnType<typeof rootReducer>
