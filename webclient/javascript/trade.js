function verifyTrade(tradeString) {
  if (!isJson(tradeString)) return false;

  const trade = JSON.parse(tradeString);
  const requiredKeys = ['to', 'items'];
  requiredKeys.forEach(key => {
    if (!(key in trade)) return false;
  });

  if (!Number.isInteger(trade['to'])) return false;
  if (typeof trade['items'] !== 'object') return false;

  return true;
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default verifyTrade;
