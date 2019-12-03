import React, { Component } from 'react';

class Accounts extends Component {
    // mapAccounts = () => {
    //     const mappedAccounts = this.props.accounts.map(account => <tr><td>account.user</td><td>account.language</td></tr>)
    //     return mappedAccounts
    // }

    render() { 
        return   (<div>
            <h4 className="pageTitle">Accounts</h4>
            {this.props.accounts.length > 0 ? 
              <tbody>
                  <tr key="tableHead"><td className="tableEntry" key="tableUser">User</td><td className="tableEntry" key="tableLang">Favourite Language</td></tr>
                  {this.props.accounts.map(account => <tr key={account.user + " row"}><td className="tableEntry" key={account.user}>{account.user}</td><td className="tableEntry" key={account.user + account.language}>{account.language}</td></tr>)}
                </tbody>
              : null
          }
        </div>);
    }
}
 
export default Accounts;