import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import React from "react";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      PlaylistName: "My playlist",
      PlaylistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.PlaylistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    } else tracks.push(track);
    this.setState({ PlaylistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.PlaylistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ PlaylistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ PlaylistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.PlaylistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.PlaylistName, trackUris).then(() => {
      this.setState({
        PlaylistName: "New playlist",
        PlaylistTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ SearchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              PlaylistName={this.state.PlaylistName}
              PlaylistTracks={this.state.PlaylistTracks}
              onRemove={this.removeTrack}
              isRemoval={true}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
