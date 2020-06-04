import React, { Component } from 'react';
import FavoritesCard from './FavoritesCard';
import { Container, Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './Favorites.css';

class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            holder: 'hw8 is hard'
        }
        this.update = this.update.bind(this);
    }

    update() {
        this.setState(prevState => {
            return { holder: prevState.holder + ' hard' };
        })
    }

    render() {
        if (localStorage.getItem('favorites')) {
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            const favoritesCards = favorites.map(item => {
                return (
                    <Col xs={12} md={3}>
                        <FavoritesCard key={item.id} article={item} update={this.update} />
                    </Col>
                );
            });
            return (
                <div>
                    <h3 id='favorites_title'>Favorites</h3>
                    <ToastContainer position={toast.POSITION.TOP_CENTER} hideProgressBar='true' />
                    <Container fluid>
                        <Row id='favorites_row'>
                            {favoritesCards}
                        </Row>
                    </Container>
                </div >

            );
        } else {
            return (
                <div>
                    <h3 id='favorites_title'>Favorites</h3>
                </div >

            );
        }

    }
}

export default Favorites;