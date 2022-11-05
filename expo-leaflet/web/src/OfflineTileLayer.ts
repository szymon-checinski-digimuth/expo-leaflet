import {createLayerComponent } from "@react-leaflet/core";
import { Coords, TileLayer } from "leaflet";
import { TileLayerProps } from "react-leaflet";
import { OfflineTileImage } from "./model";

class OfflineTileLayerInternal extends TileLayer {
    images: OfflineTileImage[] | undefined;

    setImages(images: OfflineTileImage[] | undefined) {
        this.images = images;
        this.redraw();
    }

    getTileUrl(coords: Coords): string {

        const zoom = this._getZoomForUrl();

        // consider switching to dictionary with x, y, z as keys
		return (this.images as OfflineTileImage[] | undefined)
            ?.find((i: OfflineTileImage) => i.tile.x === coords.x && i.tile.y === coords.y && i.tile.z === zoom)
            ?.imageUrl || "";
    }
}

const createOfflineLayer = (props: OfflineTileLayerProps, context:any ) => {
    console.log("OFFLINE TILE LAYER CREATED");
    const instance = new OfflineTileLayerInternal("placeholder", {...props});
    instance.setImages(props.images);
    return {instance, context};
}

const updateOfflineLayer = (instance: any, props: OfflineTileLayerProps, prevProps: OfflineTileLayerProps) => {
    if (prevProps.images !== props.images) {
      if (instance.setImages) instance.setImages(props.images);
    }
  
}

export interface OfflineTileLayerProps extends TileLayerProps {
    images?: OfflineTileImage[] 
}

const OfflineTileLayer = createLayerComponent(createOfflineLayer, updateOfflineLayer);

export default OfflineTileLayer;