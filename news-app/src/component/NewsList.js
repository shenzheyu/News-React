import React, { Component } from "react";
import fetch from 'node-fetch';
import NewsItem from './NewsItem';
import Loading from "./Loading";

class NewsList extends Component {
    constructor(props) {
        super(props);
        const intermediate = (<Loading />);
        this.state = {
            content: intermediate,
            source: this.props.source,
            section: this.props.section
        };
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        const source = this.props.source;
        const section = this.props.section;

        fetch('https://csci571-homework8-news-api.wl.r.appspot.com/articles/' + source + '/' + section)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                const newsItems = myJson.articles.map(item => {
                    return (<NewsItem key={item.id} news={item} source={source} />);
                });
                const content = (
                    <div>
                        {newsItems}
                    </div>
                );
                this.handleLoad(content);
            });
    }

    componentDidUpdate() {
        const source = this.props.source;
        const section = this.props.section;

        if (source === this.state.source && section === this.state.section) {
            return;
        } else {
            this.setState(prevState => {
                return {
                    content: prevState.content,
                    source: source,
                    section: section
                };

            })
        }

        fetch('https://csci571-homework8-news-api.wl.r.appspot.com/articles/' + source + '/' + section)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                const newsItems = myJson.articles.map(item => {
                    return (<NewsItem key={item.id} news={item} source={source} />);
                });
                const content = (
                    <div>
                        {newsItems}
                    </div>
                );
                this.handleLoad(content);
            });
    }

    handleLoad(content) {
        this.setState(prevState => {
            return {
                content: content,
                source: prevState.source,
                section: prevState.section
            };
        });
    }

    render() {
        const source = this.props.source;
        const section = this.props.section;

        return (
            <>{this.state.content}</>
        );
    }
}

export default NewsList;