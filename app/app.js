import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';

const API_KEY = '563492ad6f917000010000010ffdc1361bab44156e895c10c03716b6';

class Photo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img src={this.props.src}/>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      index: 0,
      current: '',
      prev: '',
      next: '',
      searchTerm: '',
      page: 1,
      playButton: '⏸️',
      play: true,
      intervalId: null
    }
  }

  // Get initial photos and start interval on first load

  componentDidMount() {
    this.getMorePhotos();
    this.setInterval();
  }

  // Called to get additional photos when getting towards the end of array

  getMorePhotos() {
    fetch('http://api.pexels.com/v1/popular?per_page=40&page='+this.state.page.toString(), {
      headers: {
        'Authorization': API_KEY
      }
    })
    .then(res => res.json())
    .then(resJson => {
      this.setState({
        array: this.state.array.concat(resJson.photos),
        page: this.state.page+1,
        prev: resJson.photos[this.state.index].src.medium,
        current: resJson.photos[this.state.index+1].src.medium,
        next: resJson.photos[this.state.index+2].src.medium,
        index: this.state.index+1
      })
    })
  }

  // Changes current, as well as previous and next photos, cycling through array

  changePhoto() {
    if (this.state.index >= this.state.array.length-5) {
      this.getMorePhotos();
    } else {
      this.setState({
        prev: this.state.array[this.state.index].src.medium,
        current: this.state.array[this.state.index+1].src.medium,
        next: this.state.array[this.state.index+2].src.medium,
        index: this.state.index+1
      })
    }


  // Starts interval to change photos every ~3 seconds

  setInterval() {
    var interval = setInterval(this.changePhoto.bind(this), 3000)
    this.setState({
      play: true,
      playButton: '⏸️',
      intervalId: interval
    })
  }

  // Stops interval (changing photos); used for clicking individually

  clearInterval() {
    clearInterval(this.state.intervalId)
    this.setState({
      play: false,
      playButton: '▶️',
      intervalId: null
    })
  }

  // Toggles play/pause button

  toggle() {
    (this.state.play) ? this.clearInterval() : this.setInterval()
  }

  // Goes to next photo manually and stops interval

  next() {
    this.clearInterval();
    this.changePhoto();
  }

  // Goes to previous photo manually and stops interval

  prev() {
    this.clearInterval();
    (this.state.index === 1) ?
    this.setState({
      current: this.state.array[this.state.index-1].src.medium,
      next: this.state.array[this.state.index].src.medium,
      index: this.state.index-1
    })
    :
    this.setState({
      prev: this.state.array[this.state.index-2].src.medium,
      current: this.state.array[this.state.index-1].src.medium,
      next: this.state.array[this.state.index].src.medium,
      index: this.state.index-1
    })
  }

  // Searches for keyword and starts new interval of matching images

  search() {
    this.clearInterval();
    this.setState({
      page: 1
    })
    fetch('http://api.pexels.com/v1/search?query='+this.state.searchTerm+'&per_page=40&page='+this.state.page.toString(), {
      headers: {
        'Authorization': API_KEY
      }
    })
    .then(res => res.json())
    .then(resJson => {
      this.setState({
        array: resJson.photos,
        prev: resJson.photos[0].src.medium,
        current: resJson.photos[1].src.medium,
        next: resJson.photos[2].src.medium,
        page: this.state.page+1
      })
    })
    .then(() => {
      this.setInterval();
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input id={styles.searchInput} placeholder="What would you like to see?" value={this.state.searchTerm} onChange={e => this.setState({ searchTerm: e.target.value })}/>
          <button id={styles.searchButton} className={styles.button} onClick={() => this.search()}>SEARCH</button>
        </div>
        <div className={styles.photoContainer}>
          <Photo src={this.state.current} />
          <span className={styles.attribution}>Photos provided by <a href="http://pexels.com">Pexels</a></span>
        </div>
        <div className={styles.controlContainer}>
          <button className={styles.button} onClick={() => this.prev()}>⏪</button>
          <button className={styles.button} onClick={() => this.toggle()}>{this.state.playButton}</button>
          <button className={styles.button} onClick={() => this.next()}>⏩</button>
        </div>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();
