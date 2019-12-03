import React, { Component } from 'react';

class AddAccount extends Component {
    state = { 
        searchTerm: "",
        warning: false
}

    updateSearch = (e) => {
        const searchTerm = e.target.value
            this.setState({searchTerm, warning: false},
        )            
    }

    handleSubmit = () => {
        const users = this.props.accounts.map(account => account.user)
        if (users.includes(this.state.searchTerm.toLowerCase())){
            console.log("here")
            this.setState({warning: true})
            return
        }
        fetch(`https://api.github.com/users/${this.state.searchTerm}/repos?per_page=50&sort=created`)
        .then(resp => resp.json())
        .then(data => {
            if(data.message && data.message === "Not Found"){this.setState({warning: true})}
            else{
                this.setState({warning: false})
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
            {this.state.warning === true ? <p>This user is not valid or has already been added</p>
                : null
            }
        </div> );
    }
}
 
export default AddAccount;