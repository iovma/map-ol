<script lang="ts">
    import { onMount } from "svelte"
    import "../../node_modules/ol/ol.css"
    import { Map, View } from "ol"
    import {
        Image,
        Vector as VectorLayer,
    } from "ol/layer"
    import {
        ImageStatic,
        Vector as VectorSource,
    } from "ol/source"
    import { Projection } from "ol/proj"
    import { Style, Fill } from "ol/style"
    import { TopoJSON, GeoJSON } from "ol/format"

    // @ts-ignore
    import sat5282 from "./data/5282.geo.json"

    import graticule from "./map/graticule.ts"

    const projection = new Projection({
        code: "zeli-b",
        units: "degrees",
        extent: [0, -90, 360, 90],
        worldExtent: [0, -90, 360, 90],
        global: true,
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
                new VectorLayer({
                    source: new VectorSource({
                        features: new GeoJSON({
                        }).readFeatures(sat5282),
                        wrapX: true,
                    }),
                    style: feature => new Style({
                        fill: new Fill({
                            color: feature.get("fcolor")
                        })
                    })
                }),
                graticule,
            ]
        })
    })
</script>

<style>
    #map {
        width: 100%;
        height: 100%;
        background: #5e95b4;
    }
</style>

<div id="map"/>