import React from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Flights = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);


  const passengerDelete = (id) => {

    fetch("http://127.0.0.1:8000/api/Flights/" + id, { method: 'DELETE' })
      .then((response) => {
        // console.log(response);
        setRefresh(!refresh)

        if (response.status === 200) {
          setRefresh(!refresh)
          const remaining = data.filter(p => id !== p.id)
          setData(remaining)
        }
      });
  }
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/Flights")
      .then(res => res.json())
      .then(result => {
        console.log(result); // <--- check this out in the console
        setData(result);
        setIsLoaded(true);

      },
        error => {
          setError(error);
          setIsLoaded(true);
        })
  }, [refresh])


  const handleSubmit = (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)
    axios.post('http://127.0.0.1:8000/api/Flights', formData)
      .then(resp => {
        setRefresh(!refresh)

         console.log(resp)
      })
      .catch(err => console.log(err))
  }


  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {

    return (


      <div className="container">
        <table className="table mt-5 ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Airlines</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {data.map((flights) => (
              <tr key={flights.id}>
                <td>{flights.id}</td>
                <td>{flights.Destination}</td>
                <td>{flights.Airlines}</td>
                <td>
                  <button onClick={() => passengerDelete(flights.id)}
                    className="btn btn-dark">
                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                    Delete
                  </button>
                  <button onClick={() => navigate(`/EditFlights/${flights.id}`)}
                    className="btn btn-success mx-2">
                    <FontAwesomeIcon icon="fa-solid fa-user-pen" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Destination:</label>
                <input type="text" name="Destination" className="form-control" />
              </div>

              <div className="mb-3">
                <label>Airlines:</label>
                <input type="text" name="Airlines" className="form-control" />
              </div>
              <div>
                <button className="btn btn-primary">Enters</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}



export default Flights;
