import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2% 8% 0% 8%"
        }}
      >
        <img
          src={require("../assets/logo.png")}
          style={{ width: 200 }}
          alt="Call Levels"
        />
        <div />
      </div>
    );
  }
}
Header.propTypes = {};
