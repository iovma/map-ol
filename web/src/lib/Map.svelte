<script lang="ts">
    import { onMount } from "svelte"
    import "../../node_modules/ol/ol.css"
    import { Map, View } from "ol"
    import {
        Image,
        Graticule,
        Vector as VectorLayer,
    } from "ol/layer"
    import {
        ImageStatic,
        Vector as VectorSource,
    } from "ol/source"
    import { Projection } from "ol/proj"
    import { Stroke } from "ol/style"
    import { TopoJSON, GeoJSON } from "ol/format"

    // @ts-ignore
    import sat5282 from "./data/5282.geo.json"

    const projection = new Projection({
        code: "zeli-b",
        units: "degrees",
        extent: [0, -90, 360, 90],
        worldExtent: [0, -90, 360, 90],
    })
    
    onMount(async () => {
        new Map({
            target: "map",
            view: new View({
                projection,
                center: [180, 0],
                zoom: 2,
            }),
            layers: [
                new Image({
                    source: new ImageStatic({
                        url: "https://github.com/zeli-b/sat/blob/2b403307851c333da698c14cfa2a6ef78cbfad11/%EC%84%B8%EA%B3%84%EC%A7%80%EB%8F%84/world.png?raw=true",
                        projection,
                        imageExtent: [0, -90, 360, 90],
                    })
                }),
                new Graticule({
                    strokeStyle: new Stroke({
                        color: "black",
                        width: 0.5,
                    }),
                    showLabels: true,
                    intervals: [30],
                    lonLabelFormatter(lon) {
                        if (lon < 180)  return `${lon}°N +${lon/15}`
                        if (lon == 180) return `180° +12`
                        if (lon > 180)  return `${360-lon}°V +${lon/15}`
                        return ""
                    },
                    latLabelFormatter(lat) {
                        if (lat > 0)  return `${lat}°U`
                        if (lat == 0) return `0°`
                        if (lat < 0)  return `${lat}°K`
                        return ""
                    },
                }),
                new VectorLayer({
                    source: new VectorSource({
                        features: new GeoJSON({
                        }).readFeatures(sat5282),
                    }),
                })
            ]
        })
    })
</script>

<style>
    #map {
        width: 100%;
        height: 100%;
    }
</style>

<div id="map"/>