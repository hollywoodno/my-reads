import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  shelves = [
    'Currently Reading',
    'Want to Read',
    'Read'
  ]

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(c => {
      console.log('success saving book!')
      this.setState(state => ({
        books: state.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return b
        })
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (

            <div className="list-books">

              {/* My Reads Header */}
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              {/* The Shelves */}

              <div className="list-books-content">
                <div>

                  {/* TODO: 
                    Can shelves be made into loop instead of hardcoded individually?
                  */}

                  {/*Currently Reading*/}
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ListBooks update={this.changeShelf} books={this.state.books.filter(b => b.shelf === 'currentlyReading')} />

                  {/* Want To Read*/}
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ListBooks update={this.changeShelf} books={this.state.books.filter(b => b.shelf === 'wantToRead')} />

                  {/* Read */}
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks update={this.changeShelf} books={this.state.books.filter(b => b.shelf === 'read')} />

                </div>
              </div>

              {/* Search/Add Button */}
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>

            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
