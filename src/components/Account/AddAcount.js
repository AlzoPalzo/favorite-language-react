import React, { Component } from 'react';

class AddAccount extends Component {
    state = { 
        searchTerm: "",
        warning: false,
        message: false
}

    updateSearch = (e) => {
        const searchTerm = e.target.value
            this.setState({searchTerm, warning: false, message: false},
        )            
    }

    handleSubmit = () => {
        const users = this.props.accounts.map(account => account.user)
        if (users.includes(this.state.searchTerm.toLowerCase())){
            this.setState({warning: true, message: false})
            return
        }
        fetch(`https://api.github.com/users/${this.state.searchTerm}/repos?per_page=50&sort=created`)
        .then(resp => resp.json())
        .then(data => {
            if(data.message && data.message === "Not Found"){this.setState({warning: true})}
            else{
                this.setState({warning: false, message: true})
                const languages = data.map(repos => repos.language)
                this.props.checkLanguages(languages, this.state.searchTerm.toLowerCase())
            }
        })
    }

    render() { 
        return ( <div>
            <h4 className="pageTitle">Add a new github account to find the users favourite language</h4>
            <input id="search" onChange={this.updateSearch} type="text" placeholder="Github Username" value={this.state.searchTerm}/>
            <button onClick={this.handleSubmit} id="submitAccount">Add User</button>
            {this.state.warning 
                ? <p>This user is not valid or has already been added</p>
                : null
            }
            {this.state.message
                ? <p>User added to List</p>
                : null
            }
        </div> );
    }
}
 
export default AddAccount;