import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/search?q=${query}`);
      console.log(response);
      const data = response?.data?.items;
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  return (
    <div className='search_container'>
      <h1 className='app_title'>My Search App</h1>
      <div className='search_box'>
        <input type='text' className='search_input' onChange={(e) => setQuery(e.target.value)} />
        <button className='search_button' onClick={handleSearch}>Search</button>
      </div>
      <ul className='search_results'>
        {results?.map((v, i) => (
          <li className='result_item' key={i}>
            <div className='image_div'>
              {v?.pagemap?.cse_image?.length > 0 && (
                <img
                  src={v.pagemap.cse_image[0].src}
                  alt='Result'
                  className='result_image'
                />
              )}
            </div>
            <div className='result_info'>
              <a href={v?.formattedUrl} target='_blank' rel='noopener noreferrer' className='result_link'>
                {v?.title}
              </a>
              <p className='result_url'><a href={v?.formattedUrl} target='_blank' rel='noopener noreferrer'>{v?.snippet}</a></p>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;