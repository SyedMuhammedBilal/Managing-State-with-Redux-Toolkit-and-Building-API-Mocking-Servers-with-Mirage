import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [books, setBooks] = useState([{}]);

  useEffect(() => {
    setInterval(() => {
      fetch('/api/books')
        .then(res => res.json())
        .then(data => {
      console.log(data)
      setBooks(data)
    })
    }, 2000)
  },[])

  const addBook = () => {
    const title  = prompt("Enter Book Title");
    const author = prompt("Enter Author Name");

    if(!title || !author)
      return false

    fetch('/api/add', {
      method: 'POST',
      body: JSON.stringify({title, author})
    }).catch((error) => {
      console.log("Error", error)
    })
    .then(res => res.json())
      .then(data => console.log(data))
  };

  if(!books.length) {
    return (<h2>Loading...</h2>)
  }

  return (
    <div className="App">
      <h1 className="center">Books App</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map((bookOBJ, ind) => {
              return (
                <tr key={ind}>
                  <td>{bookOBJ.title}</td>
                  <td>{bookOBJ.author}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <button onClick={addBook}>Add book</button>
    </div>
  );
}
  
export default App;
