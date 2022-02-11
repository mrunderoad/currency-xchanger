export default class ExchangeCurrency {
  static getExchange(starting, currencies, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${starting}/${currencies}/${amount}`)
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