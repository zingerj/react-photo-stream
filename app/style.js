import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "container": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "space-around",
        "height": 100 * vh,
        "width": 100 * vw
    },
    "searchContainer": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "width": 40 * vw
    },
    "controlContainer": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "width": 40 * vw
    }
});