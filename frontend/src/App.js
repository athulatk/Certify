import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login'
import Hodhome from './pages/HOD/Hodhome'
import AdvisorPage from './pages/HOD/AdvisorPage';
import AdvisorHome from './pages/Staff_Advisor/AdvisorHome'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Adminpanel from './pages/AdminPanel/Adminpanel';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/home">
        <Home/>
        </Route>
        <Route path="/hodhome">
          <Hodhome/>
        </Route>
        <Route path="/advisorhome">
          <AdvisorHome/>
        </Route>
        <Route path="/addadvisor">
          <AdvisorPage/>
        </Route>
        <Route path="/adminpanel">
        <Adminpanel/>
        </Route>
        <Route path="">
        <Login/>
        </Route>
        
        </Switch>
     </Router>
    </div>
  );
}

export default App;
