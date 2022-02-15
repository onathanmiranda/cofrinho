import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import store from "./store";
import { getAccounts } from "./store/slices/accounts";
import { getEarnings } from "./store/slices/earnings";
import { getExpenses } from "./store/slices/expenses";
import { getLeftOvers } from "./store/slices/leftovers";

import Routes from "./Routes";

function AppContainer() {
  const dispatchEvent = useDispatch();

  const timeline = useSelector(({ timeline }) => timeline);
  const userData = useSelector(({ user }) => user.data);

  useEffect(() => {
    if (userData) {
      dispatchEvent(getAccounts());
      dispatchEvent(getEarnings());
      dispatchEvent(getExpenses());
      dispatchEvent(getLeftOvers());
    }
  }, [dispatchEvent, timeline, userData]);

  return <Routes />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
