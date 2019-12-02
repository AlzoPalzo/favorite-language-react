import React, { Component } from 'react';

class AddLanguage extends Component {
    state = { 
        searchTerm: "",  
        symbol: ""
}

    validateSearchTerm = () => {
        fetch("https://api.github.com/users/" + this.state.searchTerm)
        .then(resp => resp.json())
        .then(data => {
            if (data.message && data.message === "Not Found") {
                this.setState({symbol: "invalid"})
            }
            else{
                console.log(data)
                this.setState({symbol: "valid"})
            }
        })
    }

    updateSearch = (e) => {
        const searchTerm = e.target.value
    
        if (searchTerm.length === 0) {
            this.setState({symbol: ""})
        }
        else{
            this.setState({searchTerm, symbol: "check"},
            () => {
                this.validateSearchTerm()
            })        
        }
        
    }

    render() { 
        return ( <div>
            <h2>Add a new github account to find the users favourite language</h2>
            <input id="search" onChange={this.updateSearch} type="text" placeholder="Github Username" />
            {this.state.symbol === "check"
            ? <p id="checkText">Checking</p>
            : this.state.symbol === "valid"
                ? <p id="validText">Valid</p>
                : this.state.symbol === "invalid"
                    ? <p id="invalidText"> invalid</p>
                    : null
            }
        </div> );
    }
}
 
export default AddLanguage;