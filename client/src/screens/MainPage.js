import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CurrencyList from "../components/CurrencyList";
import Header from "../components/Header";
import MainActions from "../components/MainActions";
import { requestCurrenciesData } from "../actions/currencies";
class MainPage extends Component {
  componentWillMount() {
    this.props.requestCurrenciesData();
  }
  render() {
    return (
      <div>
        <Header />
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
  status: state.currenciesReducer.currenciesLoaded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCurrenciesData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
