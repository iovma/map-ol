<script lang="ts">
    import Map from "ol/Map"
    import View from "ol/View"
    import "../../node_modules/ol/ol.css"
    import { onMount } from "svelte"
    
    onMount(async () => {
        new Map({
            target: "map",
            view: new View({
                center: [0, 0],
                zoom: 2,
            })
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