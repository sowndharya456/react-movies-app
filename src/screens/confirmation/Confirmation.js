import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import { Typography, CardContent, Card } from '@material-ui/core';
import Home from '../../screens/home/Home';
import './Confirmation.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';



class Confirmation extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            couponCode: "",
            totalPrice: 0,
            originalTotalPrice: 0.
        }
    }
 

    componentDidMount() {
        let currentState = this.state;
        currentState.totalPrice = currentState.originalTotalPrice = parseInt(this.props.bookingSummary.unitPrice, 10) * parseInt(this.props.bookingSummary.tickets, 10);
        this.setState({ state: currentState });
    }

    backToDetailsHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    couponCodeChangeHandler = (e) =>{
        this.setState({couponCode:e.target.value});
    }
    confirmBookingHandler =()=>{
        this.setState({open:true})
    }
    handleClick = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };
    render() {
        //const { classes } = this.props;

        return (
            <div>
                <Header baseUrl={this.props.baseUrl}></Header>
                <div className="bookConfirm marginTop16">
                    <Typography className="back" onClick={this.backToDetailsHandler}><span>&#60;Back to Movie Details</span></Typography>

                    <Card className="cardStyle">
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                <span >Summary</span>
                            </Typography><br /><br />
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Location:</Typography>
                                </div>
                                <div><Typography>
                                    {this.props.bookingSummary.location}
                                </Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Language:</Typography>
                                </div>
                                <div><Typography>
                                    {this.props.bookingSummary.language}
                                </Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Show Date:</Typography>
                                </div>
                                <div><Typography>
                                    {this.props.bookingSummary.showDate}
                                </Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Show Time:</Typography>
                                </div>
                                <div><Typography>
                                    {this.props.bookingSummary.showTime}
                                </Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="couponCode">Coupon Code</InputLabel>
                                    <Input id="couponCode" value={this.state.couponCode} onChange={this.couponCodeChangeHandler} />

                                </FormControl>
                                <div className="marginApply">
                                <Button variant="contained" color="primary">APPLY</Button>
                                </div>
                            </div><br />
                            <div className="coupon-container">
                                <div>
                                    <Typography>Total Price</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.bookingSummary.unitPrice * this.props.bookingSummary.tickets}</Typography>
                                </div>
                                <Snackbar
                                 anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                  }}
       autoHideDuration={6000}
        open={this.state.open}
        onClose={this.handleClose}
                                message="Booking Confirmed!" classes="success">
             
        </Snackbar>
        
      
                            </div>
                            <br />
                            <Button variant="contained" color="primary" onClick={this.confirmBookingHandler}>CONFIRM BOOKING</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}
export default Confirmation;