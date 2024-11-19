import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('')
  const apiKey = import.meta.env.VITE_API_KEY;
  
  useEffect(() => {
    fetchQuote()
  }, [])

  let isFetching = false;

  async function fetchQuote() {
    if (!apiKey) {
      console.error('API key is missing!');
      return;
  }
    if (isFetching) return;

    isFetching = true;
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
          headers: {
            'X-Api-Key': apiKey
          }
      });
      const data = await response.json();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      isFetching = false; 
    }
  }

  function handleClick() {
    fetchQuote();
  }

  return (
    <>
      <div className="container">
        <div className="quote-img">
          <img src="design/vector.png" alt="quote" />
        </div>
          <p className="text">{quote}</p>
          <hr/>
          <p className='author'>{author}</p>
        <div className="footer">
          <a href="https://x.com/compose/post">
          <img src="design/icon.png" alt="twitter" />
          </a>
          <button onClick={handleClick}>new quote</button>
        </div>
      </div>
    </>
  )
}

export default App