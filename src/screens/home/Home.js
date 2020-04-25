import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from '@material-ui/core/styles'
import moviesData from '../../common/movieData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain:{
        transform: 'translateZ(0)',
       },
       
       formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
     },
     title: {
        color: theme.palette.primary.light,
     }
});
class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>
                <GridList cols={5} className={classes.gridListUpcomingMovies}>
                    {moviesData.map(movie => (

                        <GridListTile key={movie.id}>
                            <img className="movie-poster" src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar title={movie.title}></GridListTileBar>
                        </GridListTile>

                    ))}
                </GridList>
                <div className="flex-container">
                   <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain} >
                            {moviesData.map(movie => (
                                <GridListTile  className="gridListReleasedMovies" key={"grid"+movie.id} >
                                    <img className="movie-poster" src={movie.poster_url} alt={movie.title} />
                                    <GridListTileBar title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}>

                                    </GridListTileBar>

                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    
                    <div className="right">

                    </div>
                    </div >
            </div>
        );
    }
}

export default withStyles(styles)(Home);