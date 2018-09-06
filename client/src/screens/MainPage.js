import React, { Component } from "react";
import CurrencyList from "../components/CurrencyList";
import Header from "../components/Header";
import MainActions from "../components/MainActions";

class MainPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ margin: "2% 8% 0% 8%" }}>
          <MainActions />
          <CurrencyList />
        </div>
      </div>
    );
  }
}

export default MainPage;
