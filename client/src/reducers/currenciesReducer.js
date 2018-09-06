const INTIAL_STATE = {
  currenciesList: [],
  currenciesLoaded: false
};

function currenciesReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case "RECEIVE_CURRENCIES_DATA":
      return {
        ...state,
        currenciesList: action.data,
        currenciesLoaded: true
      };
    case "LOADING_DATA":
      return {
        ...state,
        currenciesLoaded: true
      };
    default:
      return state;
  }
}

export default currenciesReducer;
