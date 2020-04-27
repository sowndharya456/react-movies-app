import React, { Component } from 'react';
import Header from '../../common/header/Header';
import moviesData from '../../common/movieData';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import Home from '../../screens/home/Home';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {}
        }
    }
    componentDidMount() {
        let currentState = this.state;
        currentState.movie = moviesData.filter((mov) => {
            return mov.id === this.props.movieId
        })[0];
        this.setState({ currentState });
   
    }
    backToHomeHandler = () =>{

        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        let movie = this.state.movie;
        console.log(movie);
        const opts={
        height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }
        return (<div className='details'>
            <Header />
            <div className="back" onClick={this.backToHomeHandler}>
                <Typography>&#60;Back to Home</Typography>

            </div>
            <div className="flex-containerDetails">
                <div className="leftDetails">
                    <img src={movie.poster_url} alt={movie.title} />;
              </div>
                <div className="middleDetails">
                    <div>
                        <Typography variant="headline" component="h2">{movie.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography ><span className="bold" >Genres :</span> {movie.genres} </Typography>
                    </div>
                   
                   
                    <div>
                        <Typography ><span className="bold" >Duration :</span> {movie.duration} </Typography>
                    </div>
                 
                    <div>
                        <Typography ><span className="bold" >Release Date :</span> {new Date(movie.release_date).toDateString()}</Typography>
                    </div>
                    
                    <div>
                        <Typography ><span className="bold" >Rating :</span> {movie.critics_rating} </Typography>
                    </div>
                    
                    <div className="marginTop16">
                        <Typography ><span className="bold" >Plot :</span><a href={movie.wiki_url}>(Wiki Link)</a>{movie.storyline} </Typography>
                    </div>
                    <div className="trailerContainer">
                            <Typography>
                                <span className="bold">Trailer:</span>
                            </Typography>
                           {console.log("movieURL:",this.state.movie.trailer_url)}
                           { this.state.movie.trailer_url !== undefined &&  
                            <YouTube  
                                videoId={movie.trailer_url.split("?v=")[1]}
                                opts={opts}
                                onReady={this._onReady}
                            />
                           }
                        </div>
                </div >
                <div className="rightDetails"></div>
            </div>
        </div>);
    }
}


export default Details;
