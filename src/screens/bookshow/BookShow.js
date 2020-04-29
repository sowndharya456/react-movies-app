import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import { Typography } from '@material-ui/core';
import Home from '../../screens/home/Home';
import  './BookShow.css';
import language from '../../common/language';
import location from '../../common/location';
import showDate from '../../common/showDate';
import showTime from '../../common/showTime';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class BookShow extends Component {

    constructor() {
        super();
        this.state = {
            location: "",
            language:"",
            showDate:"",
            showTime:"",
            tickets: 0,
            unitPrice: 500,
            availableTickets: 20
        }
    }
    backToDetailsHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    locationChangeHandler = event => {
        this.setState({ location: event.target.value });
    }
    languageChangeHandler = event =>{
        this.setState({language:event.target.value});
    }
    showTimeChangeHandler = event => {
        this.setState({showTime:event.target.value});
    }
    showDateChangeHandler = event => {
        this.setState({showDate:event.target.value});
    }
    ticketsChangeHandler = (event) => {
        this.setState({ tickets: event.target.value })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="bookShow">
                    <Typography className="back" onClick={this.backToDetailsHandler}><span>&#60;Back to Movie Details</span></Typography>
               
                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            BOOK SHOW
                        </Typography>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="location">Choose Location:
                            </InputLabel>
                            <Select 
                            value={this.state.location}
                            onChange={this.locationChangeHandler}>
                                 {location.map(loc => (
                                        <MenuItem key={"loc" + loc.id} value={loc.location}>
                                            {loc.location}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="language">Choose Language:
                            </InputLabel>
                            <Select 
                            value={this.state.language}
                            onChange={this.languageChangeHandler}>
                                 {language.map(lang => (
                                        <MenuItem key={"lang" + lang.id} value={lang.language}>
                                            {lang.language}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="showDate">Choose Show Date:</InputLabel>
                            <Select 
                            value={this.state.showDate}
                            onChange={this.showDateChangeHandler}>
                            { showDate.map(showedDate =>(
                                <MenuItem key={"showDate"+showDate.id} value={showedDate.showDate}>{showedDate.showDate}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="showTime">Choose Show Time:</InputLabel>
                            <Select 
                            value={this.state.showTime}
                            onChange={this.showTimeChangeHandler}>
                            { showTime.map(time =>(
                                <MenuItem key={"showTime"+time.id} value={time.showTime}>{time.showTime}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <FormControl required className="formControl">
                        <InputLabel htmlFor="tickets">Tickets: ( {this.state.availableTickets} available )</InputLabel>
                        <Input id="tickets" value={this.state.tickets !== 0 ? this.state.tickets : ""} onChange={this.ticketsChangeHandler} />
                        </FormControl>
                        <br /><br />
                            <Typography>
                                Unit Price: Rs. {this.state.unitPrice}
                            </Typography>
                            <br />
                            <Typography>
                                Total Price: Rs. {this.state.unitPrice * this.state.tickets}
                            </Typography>
                            <br /><br />
                        <Button variant="contained" onClick={this.bookShowButtonHandler} color="primary">
                                BOOK SHOW
                            </Button>
                    </CardContent>
                </Card>
                </div>
            </div>
        )
    }
}

export default BookShow; 