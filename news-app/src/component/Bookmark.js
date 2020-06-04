import React, { Component } from 'react';
import { MdBookmarkBorder, MdTurnedIn } from 'react-icons/md';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inBookmark: this.props.inBookmark
        }
        this.handleOnclick = this.handleOnclick.bind(this);
    }

    handleOnclick() {
        this.props.handleClick();
        this.setState({
            inBookmark: true
        })
    }

    render() {
        const inBookmark = this.state.inBookmark;
        if (inBookmark) {
            return (<MdTurnedIn id='article_bookmark' size={32} color='red' />);
        } else {
            return (<MdBookmarkBorder id='article_bookmark' size={32} color='red' data-tip='Bookmark' onClick={this.handleOnclick} />);
        }
    }
} 

export default Bookmark;