import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addModal } from "../actions/modals";
import { addCurrency } from "../actions/currencies";
import { Button } from "@material-ui/core";
import currencyData from "../currencyKeys.json";

class AddCurrencyModal extends Component {
  state = {};
  onAddCurrency = () => {
    this.props.addCurrency(this.state.selectedToAdd);
    this.props.addModal(false);
  };
  handleaddCurrencyChange = e => {
    this.setState({
      selectedToAdd: e.target.value
    });
  };
  render() {
    return (
      <Dialog
        open={this.props.addCurrencyState}
        onClose={() => this.props.addModal(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add to Portfolio</DialogTitle>
        <DialogContent>
          <FormControl>
            <InputLabel htmlFor="select-multiple">Currency</InputLabel>
            <Select
              value={
                this.state.selectedToAdd === undefined
                  ? "default"
                  : this.state.selectedToAdd
              }
              onChange={this.handleaddCurrencyChange}
              input={<Input id="select-multiple" />}
            >
              <MenuItem key={"default"} value={"default"}>
                Select a Currency to Add
              </MenuItem>
              {currencyData.currenciesKey.map(name => (
                <MenuItem
                  key={name}
                  value={name}
                  disabled={
                    this.props.activeCurrencies.includes(name) ? true : false
                  }
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.addModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.onAddCurrency();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const mapStateToProps = state => ({
  addCurrencyState: state.modalsReducer.addCurrencyModal,
  activeCurrencies: state.currenciesReducer.activeCurrencies
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addModal, addCurrency }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCurrencyModal);
