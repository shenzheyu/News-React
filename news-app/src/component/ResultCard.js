import React, { Component } from 'react';
import { Card, Image, Modal } from 'react-bootstrap';
import { IoMdShare } from 'react-icons/io';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { withRouter } from 'react-router-dom';
import SmallSectionTag from './SmallSectionTag';
import './ResultCard.css';

class ResultCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.modalClose = this.modalClose.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.expandCard = this.expandCard.bind(this);
    }

    modalClose() {
        this.setState({
            showModal: false
        });
    }

    modalOpen(e) {
        e.stopPropagation();
        this.setState({
            showModal: true
        });
    }

    expandCard(e) {
        if (e._dispatchListeners.length !== 1) {
            return;
        }
        const id = this.props.article.id;
        const source = this.props.article.source;
        this.props.history.push({ pathname: '/#/article', search: '?id=' + id, query: { id: id, source: source } });
    }

    render() {
        const title = this.props.article.title;
        const image = this.props.article.image;
        const date = this.props.article.date;
        const section = this.props.article.section;
        const url = this.props.article.url;
        const hashtag = 'CSCI_571_NewsApp';

        return (
            <Card id='result_card' onClick={this.expandCard}>
                <Modal id='modal' show={this.state.showModal} onHide={this.modalClose}>
                    <Modal.Header closeButton>
                        <h5 id='modal_title'>{title}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <h6 id='modal_body'> Share via </h6>
                        <FacebookShareButton id='modal_facebook' url={url} quote={'#' + hashtag}>
                            <FacebookIcon size={52} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton id='modal_twitter' url={url} hashtags={[hashtag]}>
                            <TwitterIcon size={52} round={true} />
                        </TwitterShareButton>
                        <EmailShareButton id='modal_email' subject={'#' + hashtag} url={url}>
                            <EmailIcon size={52} round={true} />
                        </EmailShareButton>
                    </Modal.Body>
                </Modal>
                <Card.Body>
                    <h3 id='result_card_title'>
                        {title}
                        <IoMdShare onClick={this.modalOpen} />
                    </h3>
                    <Image id='result_image' className='img-responsive' width={'100%'} src={image} />
                    <span id='result_date'>
                        {date}
                    </span>
                    <span id='result_section'>
                        <SmallSectionTag section={section} />
                    </span>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(ResultCard);