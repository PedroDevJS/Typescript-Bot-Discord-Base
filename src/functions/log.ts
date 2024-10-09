const log = Object.assign(
    (message: string): void => {
        console.log(message);
    },
    {
        success: (message: any): void => {
            console.log(`✅ | ${message}`);
        },
        error: (message: any): void => {
            console.error(`❌ Error: ${message}`);
        },
        info: (message: any): void => {
            console.info(`❗| Info: ${message}`);
        },
        warn: (message: any): void => {
            console.warn(`⚠️ Warning: ${message}`);
        },
    }
);

export default log