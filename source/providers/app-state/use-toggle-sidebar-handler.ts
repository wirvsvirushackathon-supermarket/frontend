import { useAppState } from './AppState'

export const useToggleSideBarHandler = () => {
  const { setAppState, state } = useAppState()
  return () => {
    setAppState({
      ...state,
      sidebarVisible: !state.sidebarVisible
    })
    return false
  }
}
