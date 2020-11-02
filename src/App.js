import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import OrderSummary from "./components/OrderSummary";
import CustomerProfile from "./components/CustomerProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/order-summary" />
          <Route exact path="/order-summary" component={OrderSummary} />
          <Route exact path="/customer-profile" component={CustomerProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
