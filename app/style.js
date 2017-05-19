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
        "justifyContent": "center",
        "height": 100 * vh,
        "width": 100 * vw
    },
    "searchContainer": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "width": 100 * vw
    },
    "photoContainer": {
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "height": 400,
        "width": 100 * vw,
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "center",
        "alignItems": "center"
    },
    "attribution": {
        "marginTop": 10,
        "color": "#d3d3d3",
        "fontStyle": "italic",
        "fontSize": 20,
        "fontFamily": "'Helvetica Neue'"
    },
    "a": {
        "color": "#757575"
    },
    "controlContainer": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "width": 500
    },
    "button": {
        "border": 0,
        "outline": "none",
        "backgroundColor": "#2980b9",
        "color": "white",
        "borderRadius": 10,
        "cursor": "pointer",
        "height": 80,
        "width": 120,
        "fontWeight": "bold",
        "fontFamily": "'Helvetica Neue'",
        "fontSize": 50,
        "paddingBottom": 30
    },
    "searchButton": {
        "paddingBottom": 0,
        "width": 150,
        "marginLeft": 20,
        "fontSize": 30,
        "height": 60
    },
    "searchInput": {
        "width": 400,
        "height": 50,
        "fontSize": 30,
        "fontFamily": "'Helvetica Neue'",
        "paddingTop": 0,
        "paddingRight": 5,
        "paddingBottom": 0,
        "paddingLeft": 5
    }
});