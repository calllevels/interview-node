const INTIAL_STATE = {
  editRateModal: false,
  addCurrencyModal: false
};

function modalsReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case "EDIT_MODAL":
      return {
        ...state,
        editRateModal: action.state
      };
    case "ADD_MODAL":
      return {
        ...state,
        addCurrencyModal: action.state
      };
    case "NOTIFICATION":
      return {
        ...state,
        notificationStatus: action.data.state,
        notificationAlertValue: action.data.alertValue,
        notificationCurrency: action.data.currency
      };
    default:
      return state;
  }
}

export default modalsReducer;
