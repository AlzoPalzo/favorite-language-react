import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 

import Accounts from "./Account/Accounts";
import AddAccount from "./Account/AddAcount";

class Home extends Component {
    state = { 
        accounts: [],
        page: 'home'
     }

     addNewAccount = (account) => {
        let newAccounts = [...this.state.accounts, account]
        this.setState({
            accounts: newAccounts
        })
     }

    render() { 
        return (
        <Router>
          <div id="nav">
            <button className="navButton">
                <Link to="/">Home</Link>
            </button>
            <button className="navButton">
                <Link to="/addaccount">Add Account</Link>
            </button>
          </div> 
          <Switch>
              <Route path="/addaccount">
                  <AddAccount
                    addNewAccount={this.addNewAccount}
                  />
              </Route>
              <Route path="/">
                  <Accounts/>
              </Route>
          </Switch>

        </Router>
        );
    }
}
 
export default Home;