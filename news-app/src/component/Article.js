import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import PageWithComments from './PageWithComments';
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import Bookmark from './Bookmark';
import './Article.css';

class Article extends Component {
    constructor() {
        super();
        const intermediate = (<Loading />);
        this.state = {
            content: intermediate
        };
    }

    addFavorites(title, image, date, section, source, url, id) {
        toast("Saving " + title, {
            className: 'article_toast'
        });
        if (localStorage.getItem('favorites')) {
            let prev = JSON.parse(localStorage.getItem('favorites'));
            prev.push({
                title: title,
                image: image,
                date: date,
                section: section,
                source: source,
                url: url,
                id: id
            });
            localStorage.setItem('favorites', JSON.stringify(prev));
        } else {
            localStorage.setItem('favorites', JSON.stringify([{
                title: title,
                image: image,
                date: date,
                section: section,
                source: source,
                url: url,
                id: id
            }]));
        }
    }

    checkBookmark(id) {
        if (localStorage.getItem('favorites')) {
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            for (let article of favorites) {
                if (article.id === id) {
                    return true
                }
            }
        }
        return false;
    }

    componentWillMount() {
        const source = this.props.location.query.source;
        const id = this.props.location.query.id;
        const inBookmark = this.checkBookmark(id);
        fetch('https://csci571-homework8-news-api.wl.r.appspot.com/detail/' + source + '/?id=' + id)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                const article = myJson.article;
                const title = article.title;
                const description = article.description;
                const date = article.date;
                const image = article.image;
                const url = article.url;
                const source = article.source;
                const section = article.section;
                const hashtag = 'CSCI_571_NewsApp';
                this.setState({
                    content: (
                        <div>
                            <ToastContainer position={toast.POSITION.TOP_CENTER} hideProgressBar='true' />
                            <Container fluid>
                                <Row id='article_card'>
                                    <Col xs md='12'>
                                        <Row>
                                            <h3 id='article_title'>{title}</h3>
                                        </Row>
                                        <Row>
                                            <Col xs md='3'>
                                                <h6 id='article_date'>{date}</h6>
                                            </Col>
                                            <Col xs md='9'>
                                                <div id='article_share'>
                                                    <FacebookShareButton data-tip='Facebook' url={url} quote={'#' + hashtag}>
                                                        <FacebookIcon size={24} round={true} />
                                                    </FacebookShareButton>
                                                    <ReactTooltip />
                                                    <TwitterShareButton data-tip='Twitter' url={url} hashtags={[hashtag]}>
                                                        <TwitterIcon size={24} round={true} />
                                                    </TwitterShareButton>
                                                    <ReactTooltip />
                                                    <EmailShareButton data-tip='Email' subject={'#' + hashtag} url={url}>
                                                        <EmailIcon size={24} round={true} />
                                                    </EmailShareButton>
                                                    <ReactTooltip />
                                                </div>
                                                <Bookmark inBookmark={inBookmark} handleClick={() => this.addFavorites(title, image, date, section, source, url, id)} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Image id='article_image' className='img-responsive' width={'100%'} src={image} />
                                        </Row>
                                        <Row>
                                            <p id='article_description'>{description}</p>
                                        </Row>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs md='12'>
                                        <PageWithComments id={id} />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    )
                });
            });
    }

    render() {
        return this.state.content;
    }
}

export default Article;