<script lang="ts">
    import { onMount } from "svelte"
    import "../../node_modules/ol/ol.css"
    import { Map, View } from "ol"
    import { Image } from "ol/layer"
    import { ImageStatic } from "ol/source"
    import { Projection } from "ol/proj"

    const projection = new Projection({
        code: "zeli-b",
        units: "degrees",
        extent: [0, -90, 360, 90],
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