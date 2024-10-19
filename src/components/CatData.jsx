import React, { useState } from 'react';
import Loading from './Loading';

function Catdata() {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
      const data = await response.json();
      setCats(data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPage(prevPage => prevPage + 1);
    fetchData(page + 1); // Fetch the next page
  };

  const handlePrevious = () => {
    if (page > 1) { // Ensure we can't go to a page before 1
      setPage(prevPage => prevPage - 1);
      fetchData(page - 1); // Fetch the previous page
    }
  };

  return (
    <div className='outside'>
      <div className='inside'>
        <button onClick={() => fetchData(page)} className='button'>Fetch Cats</button>
        {loading && <p className='load'><Loading/></p>}
        {cats.length === 0 && !loading && <p className='noImage'>No images available</p>}
        {error && <p>{error}</p>}
      </div>

      <div className="grid-container">
        {cats.map(cat => (
          <div key={cat.id} className="card">
            <img src={cat.url} alt="Cat" className='catImg'/>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
     { cats.length !== 0 && <div className='pagination'>
        <button onClick={handlePrevious} disabled={page === 1} className='buttonp p'>
          Previous
        </button>
        <button onClick={handleNext} className='buttonp n'>
          Next
        </button>
      </div>}
    </div>
  );
}

export default Catdata;
