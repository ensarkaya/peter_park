import AddPlate from "./components/AddPlate";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import ListPlates from "./components/ListPlates";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
          <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home} />
                    <Route path='/listPlates' exact={true} component={ListPlates} />
                    <Route path='/addPlate' exact={true} component={AddPlate} />
                </Switch>
          </Router>
    </div>
  );
}

export default App;
