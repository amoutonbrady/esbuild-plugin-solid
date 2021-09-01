import { createSignal } from "solid-js";
import { renderToString } from "solid-js/web";

const App = () => {
  const [count, setCount] = createSignal(0);
  const inc = (by = 1) => setCount(count() + by);

  return <button onClick={[inc, 1]}>{count()}</button>;
};

renderToString(App, document.getElementById("app"));
