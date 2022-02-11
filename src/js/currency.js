export default class ExchangeCurrency {
  static getExchange(currencies, amount) {
    return (`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currencies}/${amount}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    })
    .catch(function(error) {
      return Error(error.message);
    });
  }
}