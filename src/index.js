import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCurrency from './js/currency.js';

function clearFields() {
  $('#amount').val();
  $('#currencies').val();
}

function displayErrors(error) {
  let showErrors = [];
  showErrors.push("<p class='error-message'> ERROR!")
  if (parseInt(error) === 404) {
    showErrors.push(`<${error}: not found> - Currency not found! Please use a valid currency code.(USD, EUR, and so on)`);
  } else if (parseInt(error) === 403) {
    showErrors(`<${error}: forbidden> - invalid API key!`);
  } else if (parseInt(error) === 400) {
    showErrors.push(`<${error}: bad request> - Bad request!`);
  } else {
    showErrors.push(`<${error}> - Something bad happened!`);
  }
  showErrors.push('</p>');
  $('#showError').html(showErrors.join(''));
}

function displayExchange(response) {
  let result = response.conversion_result;
  let rate = response.conversion_rate;
  $('.show-result').text(result);
  $('.show-cash').text(rate);
}

$(document).ready(function() {
  $('#formOne').submit(function(event) {
    event.preventDefault();
    let amount = $('#amount').val();
    let currency = $('#currencies').val();
    clearFields(); 
    ExchangeCurrency.getExchange(currency, amount)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(exchangeResponse.message);
        }
        displayExchange(exchangeResponse, amount)
      })
      .catch(function(error) {
        displayErrors(error.message)
      });
  });
});