import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import ComsingSoon from "./Modules/ComingSoon";
import Comming from "./Modules/Comming";
import Website from "./Modules/HomePage/Website";
import Forge from "./Modules/Forge";
import Stake from "./Modules/Stake";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/comingsoon" component={Comming} />
        <Route exact path="/" component={Website} />
        <Route exact path="/merge" component={Forge} />
        <Route exact path="/stake" component={Stake} />
      </BrowserRouter>
    </>
  );
}

export default App;
