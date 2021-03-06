import React, { useContext } from "react";
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import NavigationBar from "./components/navigation/NavigationBar";
import Footer from "./components/footer/Footer";
import LoginPage from "./pages/LoginPage";
import Candidates from './pages/Candidates';
import CandidateReports from "./pages/CandidateReports";
import ErrorDisplay from "./components/UI/ErrorDisplay";
import AdminPage from "./pages/AdminPage";
import Wizard from "./pages/Wizard";
import AuthContext from "./store/auth-context";

import { Container } from "react-bootstrap";
import './App.css';


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <ErrorBoundary>
      <Container fluid className="App mx-0 mb-5 p-0">
        <NavigationBar />
        {!authCtx.loggedIn ?
          (<LoginPage />) :
          (
            <Switch>
              <Route exact path="/candidates" component={Candidates} />
              <Route exact path="/candidate/:id" component={CandidateReports} />
              <Route exact path="/admin" component={AdminPage} />
              <Route exact path="/wizard/:id" component={Wizard} />
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
