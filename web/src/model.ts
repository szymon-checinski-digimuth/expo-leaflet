import type {
  DivIcon,
  LatLngBoundsLiteral,
  LatLngLiteral,
  PointTuple,
} from 'leaflet'
import {
  CircleMarkerProps,
  CircleProps,
  PolygonProps,
  PolylineProps,
  RectangleProps,
  TooltipProps,
} from 'react-leaflet'

export type Dimensions = [width: number, height: number]

type Payload = {
  bounds: LatLngBoundsLiteral
  mapCenter: LatLngLiteral
  zoom: number
}

export type MapMarkerClickedEvent = {
  tag: 'onMapMarkerClicked'
  mapMarkerId: string
}

export type LeafletWebViewEvent =
  | { tag: 'DebugMessage'; message: string }
  | { tag: 'DocumentEventListenerAdded' }
  | { tag: 'DocumentEventListenerRemoved' }
  | { tag: 'Error'; error: any }
  | { tag: 'WindowEventListenerAdded' }
  | { tag: 'WindowEventListenerRemoved' }
  | { tag: 'MapReady'; version: string }
  | { tag: 'MapComponentMounted'; version: string }
  | { tag: 'onMapClicked'; location: LatLngLiteral }
  | MapMarkerClickedEvent
  | ({ tag: 'onMove' } & Payload)
  | ({ tag: 'onMoveEnd' } & Payload)
  | ({ tag: 'onMoveStart' } & Payload)
  | ({ tag: 'onResize' } & Payload)
  | ({ tag: 'onUnload' } & Payload)
  | ({ tag: 'onZoom' } & Payload)
  | ({ tag: 'onZoomEnd' } & Payload)
  | ({ tag: 'onZoomLevelsChange' } & Payload)
  | ({ tag: 'onZoomStart' } & Payload)

export type MapLayerType =
  | 'ImageOverlay'
  | 'TileLayer'
  | 'VectorLayer'
  | 'VideoOverlay'
  | 'WMSTileLayer'
  | 'OfflineTileLayer'

export type MapMarker = {
  icon: string
  iconAnchor?: PointTuple
  id: string
  position: LatLngLiteral
  size?: Dimensions
  title?: string,
  tooltip?: TooltipProps
}

export interface OfflineTileImage {
  imageUrl: string,
  tile: { x: number, y: number, z: number } 
}

export type MapLayer = {
  attribution?: string
  baseLayer?: boolean
  baseLayerIsChecked?: boolean
  baseLayerName?: string
  bounds?: LatLngBoundsLiteral
  id?: string
  layerType?: MapLayerType
  opacity?: number
  pane?: string
  subLayer?: string
  url?: string
  zIndex?: number,
  images?: OfflineTileImage[] 
}

type CircleShape = {
  shapeType: 'circle'
} & CircleProps

type CircleMarkerShape = {
  shapeType: 'circleMarker'
} & CircleMarkerProps

type PolygonShape = {
  shapeType: 'polygon'
} & PolygonProps

type PolylineShape = {
  shapeType: 'polyline'
} & PolylineProps

type RectangleShape = {
  shapeType: 'rectangle'
} & RectangleProps

export type MapShape = { id?: string } & (
  | CircleShape
  | CircleMarkerShape
  | PolygonShape
  | PolylineShape
  | RectangleShape
)
