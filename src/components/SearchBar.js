import React from 'react';
import './SearchBar.scss';
import ResultCard from './ResultCard';
import { useState, useEffect } from 'react';
import { getitems } from '../../src/lib/helper';

const SearchBar = ({ queryParams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(Number(0));
  const [total, setTotal] = useState(Number(0));
  const [count, setCount] = useState(0);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let queryStrings = [];
  if (queryParams.include_blogs) queryStrings.push('type=BLOG_POST');
  if (queryParams.include_landings) queryStrings.push('type=LANDING_PAGE');
  if (queryParams.include_pages) queryStrings.push('type=SITE_PAGE');
  const queryString = queryStrings.join('&');

  useEffect(async () => {
    console.log(queryString);
    const dataRusults = await getitems(
      searchTerm,
      offset,
      queryParams.results_to_show,
      queryString,
    );
    setTotal(dataRusults.total);
    offset === 0
      ? setData(dataRusults.results)
      : setData([...data, ...dataRusults.results]);
  }, [count, offset]);

  const handleChange = () => {
    setOffset(0);
    setCount(count + 1);
  };

  const handleLoadMoreClick = () => {
    setOffset(offset + queryParams.results_to_show);
  };

  return (
    <div className="site-search">
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleChange}>Search</button>
      {data.length ? (
        <>
          <h4>You searched by: {searchTerm}</h4>
          <h3> Total results: {total}</h3>
          <div className="site-search-results">
            {data.map((result) => (
              <ResultCard result={result} />
            ))}
          </div>
          <button
            onClick={handleLoadMoreClick}
            className={total == data.length && 'btn-disabled'}
          >
            Load More
          </button>
        </>
      ) : (
        <div>No data fetched</div>
      )}
    </div>
  );
};

export default SearchBar;
