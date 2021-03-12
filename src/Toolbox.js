exports.readCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return undefined;
}

exports.checkIfConnected = () => {
  let token = this.readCookie("Token")
  if (token !== undefined) {
    return true;
  }
  return false;
}

exports.transformDictFromCryptoAPI = (dictToTransform) => {
  let newDict = {}
  dictToTransform.forEach(el => {
    newDict[el.symbol] = {
      name : el.name,
      ticker : el.symbol,
      max_supply : el.max_supply,
      total_supply : el.total_supply,
      market_cap : el.quote.EUR.market_cap,
      price : el.quote.EUR.price,
      type : "Crypto-actifs"
    }
  })
  return newDict;
}