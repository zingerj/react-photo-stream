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

  componentDidMount() {
    this.getMorePhotos();
    this.setInterval();
  }

  getMorePhotos() {
    fetch('http://api.pexels.com/v1/popular?per_page=40&page='+this.state.page.toString(), {
      headers: {
        'Authorization': API_KEY
      }
    })
    .then(res => res.json())
    .then(resJson => {
      console.log('got here!', resJson);
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
  }

  setInterval() {
    var interval = setInterval(this.changePhoto.bind(this), 3000)
    this.setState({
      play: true,
      playButton: '⏸️',
      intervalId: interval
    })
  }

  clearInterval() {
    clearInterval(this.state.intervalId)
    this.setState({
      play: false,
      playButton: '▶️',
      intervalId: null
    })
  }

  toggle() {
    (this.state.play) ? this.clearInterval() : this.setInterval()
  }

  next() {
    this.clearInterval();
    this.changePhoto();
  }


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
      console.log('got here!', resJson);
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
