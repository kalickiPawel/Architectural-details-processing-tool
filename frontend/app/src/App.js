import React, { useEffect, useState } from 'react';
import './App.css';
import { People } from './components/People';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('/api/people').then(response =>
      response.json().then(data => {
        setPeople(data);
      })
    );
  }, []);

  console.log(people);

  return (
    <div className="App">
      <People people={people} />
    </div>
  );
}

export default App;
