const colors = Object.assign(
    {},
    {
        hex: (hexCode: string): number => {
            const hex = hexCode.replace('#', '');
            return parseInt(hex, 16);
        },
        rgb: (r: number, g: number, b: number): number => {
            return (r << 16) + (g << 8) + b;
        },
    }
);

export default colors;
