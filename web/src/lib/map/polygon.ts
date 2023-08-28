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

const data = await fetch("https://raw.githubusercontent.com/iovma/sat-data/dist/dist/나라.json").then(x=>x.json()) as Record<string, string | undefined>[]

export default new VectorLayer({
    source: new VectorSource({
        features: new TopoJSON({
        }).readFeatures(sat5282),
        wrapX: true,
    }),
    style: feature => {
        const isSameColor =
            (s: string | undefined) =>
            s?.toLowerCase?.() == feature.get("fcolor")
        const field = data.filter(obj => 
               isSameColor(obj.상징색1)
            || isSameColor(obj.상징색2)
            && obj.나라이름
        )[0]
        const textColor =
            field
                ? isSameColor(field.상징색1)
                    ? field.상징색1_글씨색
                    : field.상징색2_글씨색
                : ""
        return new Style({
            fill: new Fill({
                color: feature.get("fcolor")
            }),
            text: new Text({
                text: field?.나라이름 || ""
                ,
                font: `15px Heir of Light`,
                fill: new Fill({color: textColor}),
                overflow: true,
            })
        })
    },
    declutter: true,
})