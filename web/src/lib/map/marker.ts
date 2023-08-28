import { Feature } from "ol"
import { Point } from "ol/geom"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Circle, Fill, Stroke, Style, Text } from "ol/style"

const feature = new Feature({
    geometry: new Point([180, 0]),
})

export default new VectorLayer({
    source: new VectorSource({
        features: [feature],
    }),
    style: new Style({
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: "black",
            }),
            stroke: new Stroke({
                color: "white",
                width: 2,
            })
        }),
        text: new Text({
            text: "Marker",
            font: "20px Heir of Light",
            fill: new Fill({
                color: "black",
            }),
            textBaseline: "bottom",
            offsetY: -5,
        }),
    })
})