import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCurrency from './js/currency.js';

function clearField() {
  $('#amount').val();
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

$(document).ready(function() {
  $('#formOne').submit(function(event) {
    event.preventDefault();
    let money = $('#amount').val();
  
  })
})