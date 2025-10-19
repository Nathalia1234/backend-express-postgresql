
function logInfo(message) {
  const time = new Date().toLocaleString('pt-BR');
  console.log(`\x1b[36m[🔵INFO - ${time}]\x1b[0m ${message}`);
}

function logWarn(message) {
  const time = new Date().toLocaleString('pt-BR');
  console.warn(`\x1b[33m[🟡 WARN - ${time}]\x1b[0m ${message}`);
}

function logError(message) {
  const time = new Date().toLocaleString('pt-BR');
  console.error(`\x1b[31m[🔴 ERROR - ${time}]\x1b[0m ${message}`);
}

module.exports = {
  logInfo,
  logWarn,
  logError,
};
