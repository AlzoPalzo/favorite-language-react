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
        page: ''
     }

     addNewAccount = (account) => {
        let newAccounts = [...this.state.accounts, account]
        this.setState({
            accounts: newAccounts
        })
     }
     checkLanguages = (languages, searchTerm) => {
        if (languages.length < 1) {
            this.addNewAccount({user: searchTerm, language: "No Repos"})
            return
        }

        const countedLanguages  = {}

        for (let i = 0; i < languages.length; i++) {
        let language = languages[i]
        if (countedLanguages[language]) {
            countedLanguages[language] += 1
        }
        else{
            countedLanguages[language] = 1
        }
    }

        if (countedLanguages.length < 1) {
            this.addNewAccount({user: searchTerm, language: "No repos"})
            return
        }
        if(countedLanguages['C'] && Object.keys(countedLanguages).length > 1) {
            delete countedLanguages['C']
        }
        if(countedLanguages["Python"]){
            this.addNewAccount({user: searchTerm, language: 'Python'})
            return
        }

        const favourite = Object.keys(countedLanguages).reduce((a, b) => countedLanguages[a] > countedLanguages[b] ? a : b)

        this.addNewAccount({user: searchTerm, language: favourite})
    }

     changePage = (e) => {
         const button = e.target.innerText
         if (button === "Accounts"){
             this.setState({page: 'home'})
         }
         else if (button === "Add Account"){
             this.setState({page: 'add'})
         }
     }

    render() { 
        return (
        <Router>
          <div id="nav">
            <button onClick={this.changePage} className={this.state.page === "home" ? "navButton selected": "navButton"}>
                <Link className="navLink" to="/">Accounts</Link>
            </button>
            <button onClick={this.changePage} className={this.state.page === "add" ? "navButton selected": "navButton"}>
                <Link className="navLink" to="/addaccount">Add Account</Link>
            </button>
          </div> 
          <Switch>
              <Route path="/addaccount">
                  <AddAccount
                    accounts={this.state.accounts}
                    checkLanguages={this.checkLanguages}
                  />
              </Route>
              <Route path="/">
                  <Accounts
                    accounts={this.state.accounts}
                  />
              </Route>
          </Switch>

        </Router>

        );
    }
}
 
export default Home;