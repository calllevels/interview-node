import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { editModal } from "../actions/modals";
import { updateCurrency } from "../actions/currencies";
import { Button } from "@material-ui/core";

class EditRateDialog extends Component {
  state = {};
  onEditCurrency = () => {
    if (this.state.value) {
      this.props.updateCurrency(this.props.currencyToEdit, this.state.value);
    }
    this.props.editModal(false);
  };
  render() {
    return (
      <Dialog
        open={this.props.editRateState}
        onClose={() => this.props.editModal(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Assign Value</DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField
              id="value"
              label="Value"
              type="number"
              margin="normal"
              onChange={e => this.setState({ value: e.target.value })}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.editModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.onEditCurrency();
            }}
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  editRateState: state.modalsReducer.editRateModal,
  currencyToEdit: state.currenciesReducer.currencyToEdit
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editModal, updateCurrency }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRateDialog);
