import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieList] = useState([])

  const [newReview, setNewReview] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review
    })

    setMovieList([...movieReviewList, {movieName: movieName, movieReview: review}])
  }

  const deleteReview = (delMovieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${delMovieName}`)
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview
    })
    setNewReview('')
  }

  return (
    <div className="App">
      <h1>Titel</h1>

      <div className='form'>
        <label>NAME1</label>
        <input type="text" name='name1' onChange={(e) => {
          setMovieName(e.target.value)
        }}/>
        <label>NAME2</label>
        <input type="text" name='name2' onChange={(e) => {
          setReview(e.target.value)
        }}/>

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div>
              <h1 key={val.id}>Movie Name: {val.movieName} | Movie Review: {val.movieReview}</h1>
              <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
              <input type="text" id='updateInput' onChange={(e) => {
                setNewReview(e.target.value)
              }} />
              <button onClick={() => {updateReview(val.movieName)}}>Update</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;