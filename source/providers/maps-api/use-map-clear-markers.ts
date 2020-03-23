export const useClearMarkers = ({ mapState, services }) => {
  return () => {
    if (!services.mapService) return
    for (let i = 0; i < mapState.displayedMarkers.length; i += 1) {
      mapState.displayedMarkers[i].setMap(null)
    }
  }
}
