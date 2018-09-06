import React, { Component } from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { notificationPopup } from "../actions/modals";

const snackStyle = theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});
class SnackBarWrapper extends Component {
  render() {
    const {
      classes,
      notificationAlertValue,
      notificationCurrency
    } = this.props;

    return (
      <SnackbarContent
        className={classes.success}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            {notificationCurrency}
            's Value is Higher than {notificationAlertValue} !!
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.props.notificationPopup(false)}
            className={classes.close}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  notificationCurrency: state.modalsReducer.notificationCurrency,
  notificationAlertValue: state.modalsReducer.notificationAlertValue,
  notificationStatus: state.modalsReducer.notificationStatus
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notificationPopup
    },
    dispatch
  );

export default withStyles(snackStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SnackBarWrapper)
);
