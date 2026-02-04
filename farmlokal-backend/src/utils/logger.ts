export const logger = {
  info: (msg: string) => {
    console.log(`ℹ️ ${msg}`);
  },
  error: (msg: string, err?: any) => {
    console.error(`❌ ${msg}`, err);
  },
};
