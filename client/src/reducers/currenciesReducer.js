const INTIAL_STATE = {
  currenciesList: [],
  currenciesLoaded: false
};

function currenciesReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case "RECEIVE_CURRENCIES_DATA":
      let currenciesData = [];
      action.data.forEach(element => {
        currenciesData.push(element.currency);
      });
      return {
        ...state,
        currenciesList: action.data,
        activeCurrencies: currenciesData,
        currenciesLoaded: true
      };
    case "LOADING_DATA":
      return {
        ...state,
        currenciesLoaded: true
      };
    case "SET_VALUE_TO_EDIT":
      return {
        ...state,
        currencyToEdit: action.data
      };
    default:
      return state;
  }
}

export default currenciesReducer;
