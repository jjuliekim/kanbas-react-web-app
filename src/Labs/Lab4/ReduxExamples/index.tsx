import React from "react";
import HelloRedux from "./HelloRedux/index";
import CounterRedux from "./CounterRedux/index";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
    </div>
  );
};