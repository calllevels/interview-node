import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import CurrencyList from "../components/CurrencyList";

import Header from "../components/Header";
import MainActions from "../components/MainActions";
import { requestCurrenciesData } from "../actions/currencies";
import SnackBarWrapper from "../components/SnackBarWrapper";
import { notificationPopup } from "../actions/modals";
class MainPage extends Component {
  componentWillMount() {
    this.props.requestCurrenciesData();
  }

  render() {
    return (
      <div>
        <Header />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.notificationStatus}
          autoHideDuration={3000}
          onClose={() => this.props.notificationPopup(false)}
        >
          <SnackBarWrapper alertLevel={"450"} currencyKey={"IDR"} />
        </Snackbar>
        <div style={{ margin: "2% 8% 0% 8%" }}>
          <MainActions />
          {this.props.status ? (
            <CurrencyList data={this.props.data} />
          ) : (
            "LOADING"
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.currenciesReducer.currenciesList,
  status: state.currenciesReducer.currenciesLoaded,
  notificationStatus: state.modalsReducer.notificationStatus
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCurrenciesData, notificationPopup }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
