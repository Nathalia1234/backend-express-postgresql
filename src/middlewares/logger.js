// -----------------------------
// Logger personalizado com cores no terminal
// -----------------------------
export const logger = {
  logInfo: (message) => console.log(`\x1b[36m🔵 INFO:\x1b[0m ${message}`),
  logWarn: (message) => console.log(`\x1b[33m🟠 WARN:\x1b[0m ${message}`),
  logError: (message) => console.log(`\x1b[31m🔴 ERROR:\x1b[0m ${message}`),
};
