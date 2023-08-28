import {
    Vector as VectorLayer,
} from "ol/layer"
import {
    Vector as VectorSource,
} from "ol/source"
import { Style, Fill, Text } from "ol/style"
import { TopoJSON } from "ol/format"

// @ts-ignore
import sat5282 from "../data/5282.clean.topo.json"

const data = await fetch("https://raw.githubusercontent.com/iovma/sat-data/dist/dist/나라.json").then(x=>x.json())

export default new VectorLayer({
    source: new VectorSource({
        features: new TopoJSON({
        }).readFeatures(sat5282),
        wrapX: true,
    }),
    style: feature => new Style({
        fill: new Fill({
            color: feature.get("fcolor")
        }),
        text: new Text({
            text: data.find(({상징색1: color}: {상징색1: string}) => color?.toLowerCase?.() == feature.get("fcolor"))?.현지이름 || "",
            font: "bold 15px CMU serif",
            overflow: true,
        })
    }),
    declutter: true,
})