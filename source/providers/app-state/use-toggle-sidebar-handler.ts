import { useAppState } from './AppState'

export const useToggleSideBarHandler = (): (() => boolean) => {
  const { setAppState, state } = useAppState()
  return (): boolean => {
    setAppState({
      ...state,
      sidebarVisible: !state.sidebarVisible
    })
    return false
  }
}
