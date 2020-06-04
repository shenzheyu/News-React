import React, { Component } from "react";
import ResultCard from "./ResultCard";
import {Container, Row, Col} from 'react-bootstrap';
import Loading from './Loading';
import './Result.css';

class Result extends Component {
    constructor() {
        super();
        const intermediate = (<Loading />);
        this.state = {
            content: intermediate
        };
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentWillMount() {
        const q = this.props.location.query.q;

        fetch('https://csci571-homework8-news-api.wl.r.appspot.com/search/?query=' + q)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                const resultCards = myJson.articles.map(item => {
                    return (
                        <Col xs={12} md={3}>
                            <ResultCard key={item.id} article={item}/>
                        </Col>
                    );
                });
                const content = (
                    <div>
                        <h3 id='result_title'>Results</h3>
                        <Container fluid>
                            <Row id='result_row'>
                                {resultCards}
                            </Row>
                        </Container>
                    </div>
                );
                this.handleLoad(content);
            });
    }

    handleLoad(content) {
        this.setState({
            content: content
        });
    }

    render() {
        return this.state.content;
    }
}

export default Result;