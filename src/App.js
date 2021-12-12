import React,{ useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import ForgotPassword from './pages/ForgotPassword';
import Token from './Token';
// import PrivateRoute from './components/PrivateRoute';
import SignUpPage from './pages/SignUpPage';
import { createBrowserHistory } from 'history';
import HomeComponent from './components/HomeComponent';
import NewJob from './pages/NewJob';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import MyJobs from './pages/MyJobs';
import JobDetail from './pages/JobDetail';
import JobApplication from './pages/JobApplication';




function App() {

  const {acctToken} = Token();

  useEffect(() => {
    console.log(acctToken);
    // console.clear();
  },[acctToken])

  const history = createBrowserHistory()

  return (
    <div className="app">
      <Router history={history} >
        <Switch>

          <Route exact path="/" >
            {!acctToken ? <Loginpage /> : <HomeComponent /> }
          </Route>

          <Route exact path="/home" >
            {!acctToken ? <Loginpage /> : <HomeComponent /> }
          </Route>

          <Route exact path="/home/:jobId" >
            {!acctToken ? <Loginpage /> : <JobDetail /> }
          </Route>
         
          <Route exact path ="/signup" component={SignUpPage} />
          <Route exact path ="/forgot" component={ForgotPassword} />  

          <Route exact path="/createjob" >
            {!acctToken ? <Loginpage /> : <NewJob /> }
          </Route>

          <Route exact path="/profile" >
            {!acctToken ? <Loginpage /> : <Profile /> }
          </Route>

          <Route exact path="/settings" >
            {!acctToken ? <Loginpage /> : <Settings /> }
          </Route>

          <Route exact path="/myjobs" >
            {!acctToken ? <Loginpage /> : <MyJobs /> }
          </Route>

          <Route exact path="/home/application/:jobId" >
            {!acctToken ? <Loginpage /> : <JobApplication /> }
          </Route>

        </Switch>
      
      </Router>
    </div>
  );
}

export default App;

