import React, { Component, Fragment } from "react";
import { GetApp, Add } from "@material-ui/icons/";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { addModal } from "../actions/modals";
import AddCurrencyModal from "./AddCurrencyModal";
import { fetchLiveData } from "../actions/currencies";

class MainActions extends Component {
  render() {
    return (
      <Fragment>
        <AddCurrencyModal />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1
          }}
        >
          <Button
            style={{ flex: 1, marginRight: 8 }}
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.fetchLiveData(this.props.activeCurrencies);
            }}
          >
            Fetch Data Online
            <GetApp />
          </Button>
          <Button
            style={{ flex: 1, marginLeft: 8 }}
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.addModal(true);
            }}
          >
            Add Currency
            <Add />
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activeCurrencies: state.currenciesReducer.activeCurrencies,
  status: state.currenciesReducer.currenciesLoaded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addModal, fetchLiveData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainActions);
