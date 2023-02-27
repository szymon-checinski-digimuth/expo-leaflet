import type { FitBoundsOptions, LatLngLiteral, MapOptions } from 'leaflet'
import { ReactElement } from 'react'
import { LeafletWebViewEvent, MapLayer, MapMarker, MapShape } from './model'

export type LeafletMapProps = {
  mapOptions?: MapOptions
  mapLayers: MapLayer[]
  mapMarkers?: MapMarker[]
  mapShapes?: MapShape[]
  mapCenterPosition: LatLngLiteral
  zoom?: number
  maxZoom?: number,
  shouldFitToBounds?: boolean,
  fitToBoundsOptions?: FitBoundsOptions
}

export type ExpoLeafletProps = LeafletMapProps & {
  backgroundColor?: string
  loadingIndicator?: () => ReactElement
  onMapLoad?: () => void
  onMessage: (message: LeafletWebViewEvent) => void
}
