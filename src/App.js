import React from 'react';
import axios from 'axios';
import './App.scss';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    this.loadMovies();
  }
  
  loadMovies() {
    // go grab (aka get) all the data from some url
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=b6fbc7f3f313bd395902af464ef47262&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1append_to_response=videos,images&include_image_language";
    axios.get(url)
      .then(response =>
      {
        // then put just the movies (not everything) into the state
        this.setState({movies: response.data.results});
      });

  }

  render() {
    // let movies = [];
    // for(let i = 0; i < this.state.movies.length; i++)
    // {
    //   movies.push(<h2>{this.state.movies[i].title}</h2>)
    // }

    return (
      
      <div className="App">
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="#home"><img src='\assets\images\totallynotnetflix.png'></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        
        <h1><marquee direction="left" scrollamount="20" behaviour="scroll" className="banner">Check out these movies!!!!!!</marquee></h1>
        <div className="containmovie">
        {this.state.movies.map(movie =>
          {
          return(
              <div className="image">
                <img src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} alt={'poster image for ' + movie.title} className="posterimage" />
                <div className="prettify posterimage"><span>{movie.title} ({movie.release_date})</span></div>
              </div>
            )
          })}
          </div>
      </div>
    );
  }
}

export default App;
