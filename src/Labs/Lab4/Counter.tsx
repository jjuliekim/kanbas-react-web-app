import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(7);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button className="btn btn-success" onClick={() => setCount(count + 1)}
        id="wd-counter-up-click">Up</button>
      <button className="btn btn-danger m-2" onClick={() => setCount(count - 1)}
        id="wd-counter-down-click">Down</button>
      <hr />
    </div>
  );
}