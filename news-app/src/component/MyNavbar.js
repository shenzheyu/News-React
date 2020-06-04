import React, { Component } from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Switch from "react-switch";
import { Link, withRouter } from "react-router-dom";
import { MdTurnedIn, MdBookmarkBorder } from 'react-icons/md';
import AutoSuggest from './AutoSuggest';
import ReactTooltip from "react-tooltip";
import './MyNavbar.css';

class MyNavbar extends Component {

    render() {
        const display = this.props.display;
        let content = [];
        if (display === 'tabs') {
            content = (
                <Nav>
                    <Navbar.Text>
                        <Link to={{ pathname: '/#/favorites' }}>
                            <MdBookmarkBorder data-tip='Bookmark' size={25} />
                        </Link>
                        <ReactTooltip />
                    </Navbar.Text>
                    <Navbar.Text className='text-white' id='nytimes'>
                        NYTimes
                    </Navbar.Text>
                    <div style={{marginTop: '0.5rem'}}>
                        <Switch
                            as={Link}
                            onChange={this.props.handleSourceChange}
                            checked={this.props.checked}
                            onColor='#028EFB'
                            offColor='#D9D9D9'
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={25}
                            width={50}
                            handleDiameter={25}
                        />
                    </div>
                    <Navbar.Text className='text-white' id='guardian'>
                        Guardian
                    </Navbar.Text>
                </Nav>
            );
        } else if (display === 'other') {
            content = (
                <Navbar.Text>
                    <Link to={{ pathname: '/#/favorites' }}>
                        <MdBookmarkBorder data-tip='Bookmark' size={25} />
                    </Link>
                    <ReactTooltip />
                </Navbar.Text>
            );
        } else if (display === 'favorites') {
            content = (
                <Navbar.Text>
                    <Link to={{ pathname: '/#/favorites' }}>
                        <MdTurnedIn size={25} />
                    </Link>
                </Navbar.Text>
            );
        }

        return (
            <Navbar bg="light" variant='dark' expand="lg" className='navbar'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <AutoSuggest />
                </Nav>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link
                            as={Link}
                            to={{ pathname: '/#/' }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to={{ pathname: '/#/World' }}
                        >
                            World
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to={{ pathname: '/#/Politics' }}>
                            Politics
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to={{ pathname: '/#/Business' }}>
                            Business
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to={{ pathname: '/#/Technology' }}>
                            Technology
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to={{ pathname: '/#/Sports' }}>
                            Sports
                        </Nav.Link>
                    </Nav>
                    {content}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(MyNavbar);