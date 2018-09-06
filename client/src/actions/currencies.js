import axios from "axios";
export const RECEIVE_CURRENCIES_LOADING = "RECEIVE_CURRENCIES_LOADING";
export const RECEIVE_CURRENCIES_DATA = "RECEIVE_CURRENCIES_DATA";
export const SET_VALUE_TO_EDIT = "SET_VALUE_TO_EDIT";

export function fetchLiveData(actCurs = ["USD", "GBP", "SGD", "IDR"]) {
  const activeCurrencies = actCurs.toString();
  return function(dispatch) {
    dispatch(fetchCurrenciesPending());
    return axios
      .post("http://localhost:5000/populateDB/", {
        activeCurrencies
      })
      .then(data => dispatch(receiveCurrenciesData(data.data)))
      .catch(error => {
        console.log(error);
      });
  };
}

export function requestCurrenciesData() {
  return dispatch => {
    dispatch(fetchCurrenciesPending());
    fetch("http://localhost:5000/Currencies")
      .then(res => res.json())
      .then(data => dispatch(receiveCurrenciesData(data)))
      .catch(err => console.log(err)); //adderror handle
  };
}

export function addCurrency(currencyKey) {
  return function(dispatch) {
    dispatch(fetchCurrenciesPending());
    return axios
      .post("http://localhost:5000/Currencies/", {
        currencyKey
      })
      .then(data => dispatch(receiveCurrenciesData(data.data)))
      .catch(error => {
        console.log(error);
      });
  };
}
export function setAlert(currencyKey, alertValue) {
  return function(dispatch) {
    dispatch(fetchCurrenciesPending());
    return axios
      .put("http://localhost:5000/Currencies/setAlert", {
        currencyKey,
        alertValue
      })
      .then(data => dispatch(receiveCurrenciesData(data.data)))
      .catch(error => {
        console.log(error);
      });
  };
}
export function updateCurrency(currencyKey, newValue) {
  return function(dispatch) {
    return axios
      .put("http://localhost:5000/Currencies", {
        currencyKey,
        newValue
      })
      .then(data => dispatch(receiveCurrenciesData(data.data)))

      .catch(error => {
        console.log(error);
      });
  };
}

export function removeAlert(currencyKey) {
  return function(dispatch) {
    dispatch(fetchCurrenciesPending());
    return axios
      .put("http://localhost:5000/Currencies/removeAlert", {
        currencyKey
      })
      .then(data => dispatch(receiveCurrenciesData(data.data)))
      .catch(error => {
        console.log(error);
      });
  };
}
export function deleteCurrency(currencyKey) {
  return function(dispatch) {
    dispatch(fetchCurrenciesPending());
    return axios
      .delete("http://localhost:5000/Currencies/", {
        data: {
          currencyKey
        }
      })
      .then(data => dispatch(receiveCurrenciesData(data.data)))
      .catch(error => {
        console.log(error);
      });
  };
}
export const setToEditValue = data => ({
  type: SET_VALUE_TO_EDIT,
  data
});
export const receiveCurrenciesData = data => ({
  type: RECEIVE_CURRENCIES_DATA,
  data
});

function fetchCurrenciesPending() {
  return {
    type: RECEIVE_CURRENCIES_LOADING
  };
}
