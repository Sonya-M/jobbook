import React, { useContext } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from "./components/ErrorBoundary";
import NavigationBar from "./components/UI/NavigationBar";
import Footer from "./components/UI/Footer";
import LoginPage from "./pages/LoginPage";
import Candidates from './pages/Candidates';
import CandidateReports from "./pages/CandidateReports";
import ErrorDisplay from "./components/ErrorDisplay";
import AdminPage from "./pages/AdminPage";
import Wizard from "./pages/Wizard";
import AuthContext from "./store/auth-context";

import { Container } from "react-bootstrap";
import './App.css';
import { Link } from "react-router-dom";


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <ErrorBoundary>
      <Container fluid className="App">
        <NavigationBar />
        {!authCtx.loggedIn ?
          (<LoginPage />) :
          (
            <Switch>
              <Route exact path="/candidates" component={Candidates} />
              <Route exact path="/candidate/:id" component={CandidateReports} />
              <Route exact path="/admin" component={AdminPage} />
              <Route exact path="/wizard" component={Wizard} />
              <Redirect exact from="/" to="/candidates"></Redirect>
              <Route>
                <ErrorDisplay message="Not found">
                  <h4 className="text-muted fw-light">
                    The page you are looking for does not exist
                  </h4>
                  <Link to="/candidates" className="fs-4">Home</Link>
                </ErrorDisplay>
              </Route>
            </Switch>)
        }
        <Footer />
      </Container >
    </ErrorBoundary>
  );
}

export default App;
