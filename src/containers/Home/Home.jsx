import React, { useEffect, useState } from "react";
import axios from "axios";
import JumboTron from "../../components/JumboTron/JumboTron";
import Search from "../../components/Search/Search";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [alteredUsers, setAlteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=20")
      .then((response) => {
        console.log(response.data.results);
        setUsers(response.data.results);
        setAlteredUsers(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchResults = (e) => {
    const search = e.target.value;

    if (search === "") {
      setAlteredUsers(users);
      return;
    }
    const searchResults = [...users].filter((user) => {
      return (
        user.name.first.toLowerCase().includes(search.toLowerCase()) ||
        user.name.last.toLowerCase().includes(search.toLowerCase()) ||
        user.location.country.toLowerCase().includes(search.toLowerCase()) ||
        user.email.includes(search.toLowerCase())
      );
    });
    setAlteredUsers(searchResults);
  };

  const clickSortUsers = () => {
    const sortUsers = [...users];
    const sortedUsers = sortUsers.sort((a, b) => {
      if (a.users.name.last < b.users.name.last) {
        return users.direction === "ascending" ? 1 : -1;
      } else if (a.users.name.last > b.users.name.last) {
        return users.direction === "descending" ? -1 : 1;
      }
      return 0;
    });
    setUsers(sortedUsers);
    console.log(sortedUsers);
  };

  return (
    <div className="container">
      <div className="row">
        <JumboTron />
        <Search onChange={searchResults} />
      </div>

      <div className="row">
        <table className="table sortable table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">First</th>
              <th scope="col" onClick={clickSortUsers} id="nameSort">
                Last
              </th>
              <th scope="col">Email</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {alteredUsers.map((user) => (
              <tr>
                <th scope="row">
                  <img alt="User Pic" src={user.picture.medium} />
                </th>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.email}</td>
                <td>{user.location.country}</td>
              </tr>
            ))}
            ;
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
