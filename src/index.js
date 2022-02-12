import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCurrency from './js/currency.js';

function displayErrors(error) {
  let showErrors = [];
  showErrors.push("<p class='error-message'> ERROR!");
  if (parseInt(error) === 404) {
    showErrors.push(`<${error}: Not Found> - Currency not found! Please use a valid three letter currency code.`);
  } else if (parseInt(error) === 403) {
    showErrors(`<${error}: Forbidden> - Invalid API key!`);
  } else if (parseInt(error) === 400) {
    showErrors.push(`<${error}: Bad Request> - Bad request!`);
  } else {
    showErrors.push(`<${error}> - Ruh Roh! Something bad happened!`);
  }
  showErrors.push('</p>');
  $('#showError').html(showErrors.join(''));
}

function displayExchange(response) {
  let result = response.conversion_result;
  let rate = response.conversion_rate;
  let updated = response.time_last_update_utc;
  let start = $('#starting').val();
  let chosen = $('#currencies').val();
  let cash = $('#amount').val();
  $('.chosen').text(chosen);
  $('.show-result').text(result);
  $('.show-cash').text(rate);
  $('.usd').text(cash);
  $('.start').text(start);
  $('#lastUpdated').text(updated);
}

$(document).ready(function() {
  $('#formOne').submit(function(event) {
    event.preventDefault();
    let amount = $('#amount').val();
    let currency = $('#currencies').val();
    let start = $('#starting').val();
    
    ExchangeCurrency.getExchange(start, currency, amount)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(exchangeResponse.message);
        }
        displayExchange(exchangeResponse, amount, start);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
      $('.form-section').fadeOut();
      setTimeout(function() {
        $('.card').fadeIn();
      }, 600); 
  });

  $('#back-btn').on("click", function() {
    window.location.reload();
  });

  $('#start-btn').on("click", function() {
    $('.starting-page').fadeOut();
    setTimeout(function() {
      $('.form-section').fadeIn();
    }, 500);
  });
});