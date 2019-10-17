import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState({
    title:'',
    director:'',
    metascore:'',
    stars: ''
  });
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => res.data
      )
      .then(data => {
        const movie = {
          ...data,
          title: data.title, 
          director: data.director,
          metascore: data.metascore,
          stars: data.stars.join(',')
        }
        setMovie(movie)
      })
      .catch(err => console.log(err.response));
  }, [id])

  const handleChange = (e) => {
    setMovie({...movie, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieToUpdate = {...movie, stars: movie.stars.split(',')};
    movieToUpdate.id = id;
    axios.put(`http://localhost:5000/api/movies/${id}`, movieToUpdate)
      .then(res => {
        props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="form-data">
      <div className="login-header mb-4">
        Edit Movie
      </div>
      <form className='input-form' onSubmit={handleSubmit}>      
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type='text'
            name='title'
            onChange={handleChange}
            value={movie.title}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Director</label>
          <input
              type='text'
              name='director'
              onChange={handleChange}
              value={movie.director}
              required
              className="form-control"
            />
        </div>
        <div className="form-group">
          <label htmlFor="">Metascore</label>
          <input
              type='number'
              name='metascore'
              onChange={handleChange}
              value={movie.metascore}
              required
              className="form-control"
            />
        </div>
        <div className="form-group">
          <label htmlFor="">Stars</label>
          <input
              type='text'
              name="stars"
              onChange={handleChange}
              value={movie.stars}
              required
              className="form-control"
            />
          </div>
        <button className="btn btn-primary">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
