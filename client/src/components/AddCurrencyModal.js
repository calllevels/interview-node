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
import { Button } from "@material-ui/core";
import currencyData from "../currencyKeys.json";

class AddCurrencyModal extends Component {
  state = {};

  handleaddCurrencyChange = () => {};
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
              value={"default"}
              onChange={this.handleaddCurrencyChange}
              input={<Input id="select-multiple" />}
            >
              <MenuItem key={"default"} value={"default"}>
                Select a Currency to Add
              </MenuItem>
              {currencyData.currenciesKey.map(name => (
                <MenuItem key={name} value={name}>
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
            // onClick={() => {
            // }}
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
  addCurrencyState: state.modalsReducer.addCurrencyModal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCurrencyModal);
