import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

import Store from "./store";
import MainPage from "./screens/MainPage";

ReactDOM.render(
  <Provider store={Store}>
    <MainPage />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
