

//tw rose
const colorScale = {

    bg50:  "#FFF1F2",
    bg300: "#FBA3B0",
    bg400: "#FB7185",
    bg500: "#F43F5E",
    bg600: "#E11D48",
    bg700: "#BE123C",
    bg800: "#9F1239",
    bg900: "#881337",
}
const colorScaleArr = Object.values(colorScale);

const bgScale = {
    bg: '#111827',
}

function addAlpha(hex:string, percent:number){
    const alpha = Math.round(percent * 255);
    const alphaHex = (alpha < 16 ? '0':'') + alpha.toString(16);

    return hex.substring(0,7) + alphaHex; 
}

export {colorScale, colorScaleArr, bgScale, addAlpha} ;