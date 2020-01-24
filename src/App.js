import React, { Component } from 'react';
import './App.css';
import GameApps from './GameApps';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      search: "",
      sort: "",
      genre: "",
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    })
  }

  setGenre(genre) {
    this.setState({
      genre
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if (this.state.genre) {
      params.push(`genres=${this.state.genre}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          games: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time.'
        });
      });
  }

  render() {
    const games = this.state.games.map((game, i) => {
      return <GameApps {...game} key={i} />
    });

    return (
      <main className='App'>
        <h1>Google Play Apps</h1>
          <div className="search">
            <form onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="search">Search: </label>
              <input 
                type="text" 
                id="search" 
                name="search"
                value={this.state.search}
                onChange={(e) => this.setSearch(e.target.value)} />

              <label htmlFor="sort">Sort: </label>
              <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
                <option value="">None</option>
                <option value="Rating">Rating</option>
                <option value="App">App</option>
              </select>

              <label htmlFor="genre">Genre: </label>
              <select id="genre" name="genre" onChange={e => this.setGenre(e.target.value)}>
                <option value="">None</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
                <option value="Arcade">Arcade</option>
                <option value="Card">Card</option>
              </select>
              <button type="submit" >Submit</button>
            </form>
            <div className="App_error">{ this.state.error }</div>
          </div>  
          {games}
      </main>
    );
  }
  
}

export default App;
