import React, {useEffect, useState} from 'react'
import Header from './components/Header';

function App() {

    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])

  return (
    <div>

        <Header/>

        {(typeof backendData.users == 'undefined') ? (
            <p>Loading...</p>
        ) : (
            backendData.users.map((user, i) => (
                <p key={i}>{user}</p>
            ))
        )}

    </div>
  )
}

export default App