export const hex2rgbValues = (hex) => {

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;

};

export const hex2rgb = (hex) => {

    const rgbValues = hex2rgbValues(hex);

    return `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`;

};

export const hex2rgba = (hex, alpha) => {

    const rgbValues = hex2rgbValues(hex);

    return `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`;

};
