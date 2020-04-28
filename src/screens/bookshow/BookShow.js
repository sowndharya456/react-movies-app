import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import { Typography } from '@material-ui/core';
import Home from '../../screens/home/Home';
import  './BookShow.css';

class BookShow extends Component {

    backToDetailsHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    render() {
        return (
            <div>
                <Header />
                <div className="bookShow">
                    <Typography className="back" onClick={this.backToDetailsHandler}><span>&#60;Back to Movie Details</span></Typography>
                </div>
            </div>
        )
    }
}

export default BookShow; 