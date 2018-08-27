import React, { Component } from 'react'
import './App.css'
import { IsLoggedIn, ProtectedRoute, logOut } from '../../lib/auth'
import { getSupportedLanguage } from '../../api/settings'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import 'bulma/css/bulma.css'

import NavBar from '../../components/navBar/navBar'
import Footer from '../../components/footer'
import Point from '../points/point'
import Path from '../path/path'
import LoginPage from '../login/login'
import Profile from '../profile/profile'

class App extends Component {

  constructor () {
    super()
    this.state = {
      token: null,
      languages: [],
      lng: 'it',
      point: null
    }
  }

  componentDidMount() {
    const token = IsLoggedIn()
    if (token) {
      getSupportedLanguage(token)
        .then(({languages}) => {
          this.setState((prev) => ({
            ...prev,
            token: token,
            languages
          }))
        })
        .catch(err => console.log(err))
    }
  }

  logout = () => {
    logOut()
    this.setState((prev) => ({
      ...prev,
      token: null,
      languages: []
    }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar isLoggedIn={this.state.token} loggingOut={this.logout}/>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/"
            exact
            render={ProtectedRoute(() => (<h1>Home</h1>), <Redirect to="/login"/>)} />
            <Route path="/point/:point_id"
            exact
            render={ProtectedRoute(({ match }) => (
                <Point
                  isLoggedIn={this.state.token}
                  lng={this.state.lng}
                  languages={this.state.languages}
                  point_id={ match.params.point_id } />
                ), <Redirect to="/login"/>)} />
            <Route path="/path/:path_id"
            exact
            render={ProtectedRoute(({ match }) => (
                <Path
                isLoggedIn={this.state.token}
                lng={this.state.lng}
                languages={this.state.languages}
                path_id={match.params.path_id} />
              ), <Redirect to="/login"/>)} />
            <Route path="/path"
            exact
            isLoggedIn={this.state.token}
            lng={this.state.lng}
            languages={this.state.languages}
            render={ProtectedRoute(() => (
              <Path
                isLoggedIn={this.state.token}
                lng={this.state.lng}
                languages={this.state.languages}/>
            ), <Redirect to="/login"/>)} />
            <Route
            path="/point"
            exact
            render={ProtectedRoute(() => (
              <Point
                isLoggedIn={this.state.token}
                lng={this.state.lng}
                languages={this.state.languages}/>
            ), <Redirect to="/login"/>)} />
            <Route path="/profile" render={ProtectedRoute(() => (<Profile isLoggedIn={this.state.token} />), <Redirect to="/login"/>)} />
            <Route component={ProtectedRoute(() => (<h1>Home</h1>), <Redirect to="/login"/>)} />
          </Switch>
          <Footer isLoggedIn={this.state.token} languages={this.state.languages}/>
        </div>
      </Router>
    );
  }
}

export default App;
