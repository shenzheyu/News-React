import React from 'react';
import commentBox from 'commentbox.io';

class PageWithComments extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5713087835406336-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.id}/>
        );
    }
}

export default PageWithComments;