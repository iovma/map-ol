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
    import { Style, Fill, Text } from "ol/style"
    import { TopoJSON } from "ol/format"
    import {
        Select,
        Modify,
        defaults as defaultInteractions,
    } from "ol/interaction"

    import graticule from "./map/graticule.ts"
    import polygon from "./map/polygon.ts"

    const projection = new Projection({
        code: "zeli-b",
        units: "degrees",
        extent: [0, -90, 360, 90],
        worldExtent: [0, -90, 360, 90],
        global: true,
    })
    
    onMount(async () => {
        const select = new Select()
        new Map({
            target: "map",
            interactions:
                defaultInteractions()
                .extend([
                    select,
                    new Modify({
                        features: select.getFeatures(),
                    })
                ]),
            view: new View({
                projection,
                center: [180, 0],
                zoom: 2,
            }),
            layers: [
                /*
                new Image({
                    source: new ImageStatic({
                        url: "https://github.com/zeli-b/sat/blob/2b403307851c333da698c14cfa2a6ef78cbfad11/%EC%84%B8%EA%B3%84%EC%A7%80%EB%8F%84/world.png?raw=true",
                        projection,
                        imageExtent: [0, -90, 360, 90],
                    })
                }),*/
                polygon,
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