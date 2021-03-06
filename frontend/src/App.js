import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login'
import Hodhome from './pages/HOD/Hodhome'
import AdvisorPage from './pages/HOD/AdvisorPage';
import AdvisorHome from './pages/Staff_Advisor/AdvisorHome'
import PrincipalHome from './pages/Principal/PrincipalHome'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Adminpanel from './pages/AdminPanel/Adminpanel';
// import store from './redux/store'
// import {Provider} from 'react-redux'

function App() {

  return (
      <div className="App">
        <Router>
          <Switch>
          <Route path="/student/home">
          <Home/>
          </Route>
          <Route path="/hod/home">
            <Hodhome/>
          </Route>
          <Route path="/advisor/home">
            <AdvisorHome/>
          </Route>
          <Route path="/authority/home">
            <PrincipalHome/>
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
