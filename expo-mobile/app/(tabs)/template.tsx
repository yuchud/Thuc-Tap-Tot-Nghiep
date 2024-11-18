import * as React from "react";
import { LinearProgress } from "@rneui/base";

export default () => {
  return (
    <LinearProgress
      value={0.5}
      variant="determinate"
      style={{ width: "90%" }}
      color="primary"
    />
  );
}