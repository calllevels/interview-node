import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button, Input } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Edit, Delete, AddAlert, Remove } from "@material-ui/icons";
import { editModal, notificationPopup } from "../actions/modals";
import {
  deleteCurrency,
  setAlert,
  removeAlert,
  setToEditValue
} from "../actions/currencies";
import EditRateDialog from "./EditRateDialog";

function getStyles(theme) {
  return {
    root: {
      boxShadow: `1px 1px  1px 1px #ddd`,
      marginTop: 12
    }
  };
}
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class CurrencyList extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  renderInput = cur => {
    const curName = cur.currency;
    return (
      <Input
        placeholder="Set Alert"
        type="number"
        value={this.state[curName] || cur.alertValue || ""}
        onChange={e => this.setState({ [curName]: e.target.value })}
      />
    );
  };
  addAlert = cur => {
    if (this.state[cur]) {
      this.props.setAlert(cur, this.state[cur]);
    } else {
      alert("Input is empty !");
    }
  };
  deleteAlert = cur => {
    this.props.removeAlert(cur);
    this.setState({ [cur]: "" });
  };

  editValue = cur => {
    this.props.setToEditValue(cur);
    this.props.editModal(true);
  };
  render() {
    const { classes, data } = this.props;
    return (
      <Fragment>
        <EditRateDialog />
        <Table className={classes.root}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Currency</CustomTableCell>
              <CustomTableCell>Current Rate</CustomTableCell>
              <CustomTableCell>Alert Level</CustomTableCell>
              <CustomTableCell>Actions</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((cur, index) => {
              if (cur.alertValue <= cur.value) {
                this.props.notificationPopup(
                  true,
                  cur.currency,
                  cur.alertValue
                );
              } //not advised
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {cur.currency}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {cur.value} / EUR
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {this.renderInput(cur)}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.addAlert(cur.currency);
                      }}
                    >
                      Add Alert
                      <AddAlert />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.deleteAlert(cur.currency);
                      }}
                    >
                      Remove Alert
                      <Remove />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.editValue(cur.currency);
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.props.deleteCurrency(cur.currency);
                      }}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editModal,
      deleteCurrency,
      setAlert,
      removeAlert,
      setToEditValue,
      notificationPopup
    },
    dispatch
  );

export default withStyles(getStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CurrencyList)
);
