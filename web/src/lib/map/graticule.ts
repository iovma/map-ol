import { Graticule } from "ol/layer"
import { Stroke } from "ol/style"

export default new Graticule({
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
    wrapX: true,
})