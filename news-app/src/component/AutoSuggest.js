import React, { Component } from 'react';
import Select from 'react-select';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import './AutoSuggest.css';

class AutoSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            input: ''
        };
        this.getSuggestions = this.getSuggestions.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getSuggestions(query) {
        this.setState(prevState => {
            return {
                suggestions: prevState.suggestions,
                input: query
            };
        });

        let myHeaders = new Headers();
        myHeaders.append('Ocp-Apim-Subscription-Key', 'dd9f1e3ac20e450696f601093186050d');

        let myInit = {
            method: 'GET',
            headers: myHeaders
        };

        let myRequest = new Request('https://csci571-homework8.cognitiveservices.azure.com/bing/v7.0/suggestions?mkt=en-US&q=' + query, myInit);

        fetch(myRequest)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                try {
                    const searchSuggestion = myJson.suggestionGroups[0].searchSuggestions;
                    let suggestions = [];
                    for (let i = 0; i < searchSuggestion.length; i++) {
                        suggestions.push({ label: searchSuggestion[i].displayText, value: i });
                    }
                    this.setState(prevState => {
                        return {
                            suggestions: suggestions,
                            input: prevState.input
                        };
                    });
                } catch {
                }

            });
    }

    handleChange(opt) {
        this.props.history.push({ pathname: '/#/search', search: '?q=' + opt.label, query: { q: opt.label } });
    }

    componentWillUnmount() {
        this.setState({
            input: null
        });
    }

    render() {
        return (
            <Select
                options={this.state.suggestions}
                onInputChange={_.debounce(this.getSuggestions, 1000, {
                    leading: true
                })}
                onChange={this.handleChange}
                className="select"
                placeholder="Enter keyword .."
                value={this.state.input}
            />
        );
    }
}

export default withRouter(AutoSuggest);