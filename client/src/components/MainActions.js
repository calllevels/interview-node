import React, { Component, Fragment } from "react";
import { GetApp, Add } from "@material-ui/icons/";
import { Button } from "@material-ui/core";

class MainActions extends Component {
  render() {
    return (
      <Fragment>
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
          >
            Fetch Data Online
            <GetApp />
          </Button>
          <Button
            style={{ flex: 1, marginLeft: 8 }}
            variant="contained"
            color="primary"
          >
            Add Currency
            <Add />
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default MainActions;
