import React, { Component } from 'react';
import { Container, Row, Col, Image, Modal } from 'react-bootstrap';
import { IoMdShare } from 'react-icons/io';
import { withRouter } from 'react-router-dom';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import SectionTag from './SectionTag';
import './NewsItem.css';

class NewsItem extends Component {
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
        const id = this.props.news.id;
        this.props.history.push({ pathname: '/#/article', search: '?id=' + id, query: { id: id, source: this.props.source } });
    }

    render() {
        const title = this.props.news.title;
        const description = this.props.news.description;
        const date = this.props.news.date;
        const section = this.props.news.section;
        const image = this.props.news.image;
        const url = this.props.news.url;
        const hashtag = 'CSCI_571_NewsApp';
        return (
            <Container fluid onClick={this.expandCard} id='card'>
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
                <Row id='row'>
                    <Col xs={12} md={3}>
                        <Image className='img-responsive' id='image' width={'100%'} src={image} id='image' />
                    </Col>
                    <Col xs={12} md={9}>
                        <Row>
                            <h5 id='title'>
                                {title}
                                <IoMdShare onClick={this.modalOpen} />
                            </h5>
                        </Row>
                        <Row>
                            <p id='description'>
                                {description}
                            </p>
                        </Row>
                        <Row>
                            <span id='date'>
                                {date}
                            </span>
                            <span id='section'>
                                <SectionTag section={section} />
                            </span>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(NewsItem);