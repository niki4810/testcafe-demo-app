import React, { useState } from 'react';
import './App.css';

const Spinner = () => {
  return (
    <div
      data-test-id="spinner"
      className="spinner">
      <span className="spinner-text">Loading</span><span className="spinner-logo" role="img" aria-label="loading">🌀</span>
    </div>
  )
};

const Details = (props) => {
  return (
    <React.Fragment>
      <h2>User Details</h2>
      <ul data-test-id="user-details">
        <li >Name: <span data-test-id="username">{props.userDetails.name}</span></li>
        <li>Id: <span data-test-id="userid">{props.userDetails.login}</span></li>
      </ul>
    </React.Fragment>
  )
};
const App = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const fetchUser = async () => {
    setIsLoading(true);
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const data = await resp.json();
    setIsLoading(false);
    setUserDetails(data);
  };

  return (
    <div className="app">
      <div className="search-box">
        <input
          data-test-id="txt-search"
          placeholder="Enter username"
          className="txt-search"
          type="text"
          value={username}
          onChange={(ev) => { setUsername(ev.target.value) }}
        />
        <button
          data-test-id="btn-search"
          className="btn-search"
          onClick={fetchUser}
        >
          Get User
        </button>
      </div>
      {isLoading && <Spinner />}
      {!isLoading && userDetails && <Details userDetails={userDetails}/>}
    </div>
  );
}

export default App;