export const addModal = state => ({
  type: "ADD_MODAL",
  state
});

export const editModal = state => ({
  type: "EDIT_MODAL",
  state
});

export const notificationPopup = (state, currency = "", alertValue = "") => ({
  type: "NOTIFICATION",
  data: { state, currency, alertValue }
});
