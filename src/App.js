import React from 'react';
import axios from 'axios';
import './App.scss';
import { Navbar, Nav, Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Image from './assets/images/totallynotnetflix.png';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genre: [],
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
  SortByAction () {
    const genurl = "https://api.themoviedb.org/3/genre/movie/list?api_key=b6fbc7f3f313bd395902af464ef47262&language=en-US";
    axios.get(genurl)
      .then(response =>
        {
          this.setState({genre: response.data.results})
        })
    
  }
  
  render() {
    // let movies = [];
    // for(let i = 0; i < this.state.movies.length; i++)
    // {
    //   movies.push(<h2>{this.state.movies[i].title}</h2>)
    // }

    return (
      
      <div className="App">
        <Navbar bg="dark" expand="lg" fixed="top">
          <Navbar.Brand href="#home">
            <img 
              src={Image} 
              width="100"
              height="100"
              className="logo"
              alt="Totally Not Netflix logo"
            />
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <DropdownButton id="dropdown-basic-button" title="Sort by">
              {/* {this.state.genre.map(genre =>
              {
                return(
                  <Dropdown.Item href="#/action-1">{genre}</Dropdown.Item>
                )
              })} */}
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Comedy</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Popularity</Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Navbar>
        

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
