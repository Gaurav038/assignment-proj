import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [filtered, setFiltered] = useState([])
  const [searchName, setSearchName] = useState("");

  
  const handleSearch = async() => {

    try {
      const data = await fetch('https://reqres.in/api/users?page=2')
      const result = await data.json()

      const filteredData = result?.data.filter((student) =>
        student.first_name.toLowerCase().includes(searchName.toLowerCase())
      );

      setFiltered(filteredData)
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    handleSearch()
  },[searchName])

  return (
    <div className="App">
      <div className='search-box'>
        <input
          type="text"
          value={searchName}
          placeholder='enter to search'
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {
        filtered && filtered.map((value) => {
          return <div key={value.first_name}>
            <div className='box-border'>
              <span className='id-div'>{value.id}</span>
              <img src={value.avatar} />
            </div>
              <div style={{fontSize: '20px'}} >{value.first_name}</div>
          </div>
        })
      }
    </div>
  );
}

export default App;
