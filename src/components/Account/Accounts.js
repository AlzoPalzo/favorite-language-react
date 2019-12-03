import React, { Component } from 'react';

class Accounts extends Component {

    remove = (e) =>{
        this.props.removeAccount(e.target.id.split(' ')[0])
    }

    render() { 
        return   (<div>
            <h4 className="pageTitle">Accounts</h4>
            {this.props.accounts.length > 0 ? 
            <div>
                <table>
                    <tbody>
                        <tr key="tableHead"><td className="tableEntry header" key="tableUser">User</td><td className="tableEntry header" key="tableLang">Favourite Language</td></tr>
                        {this.props.accounts.map(account => 
                        <tr onClick={this.remove} key={account.user + " row"}>
                            <td className="tableEntry" id={account.user} key={account.user}>{account.user}</td>
                            <td className="tableEntry" id={account.user + ' ' + account.language} key={account.user + ' ' + account.language}>{account.language}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <p id="tableInfo">Click on a entry to remove the account</p>
            </div>
            : <h5>Use the Add Account tab to add Github user accounts here</h5>
          }
        </div>);
    }
}
 
export default Accounts;