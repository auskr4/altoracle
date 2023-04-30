import axios from "axios";
import React, { useState, useEffect } from "react";
import { searchPlayer } from "./Api";
import Profile from "./Profile";
import { useContext } from "react";
import { TokenContext } from "./TokenContext";
//import styles from "./SearchBar.module.css";


function SearchBar() {
  const [query, setQuery] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const token = useContext(TokenContext);

  async function searchPlayerByName(event) {
    event.preventDefault();
    const [characterName, realm] = query.split("-");

    const { data: playerSearchData, error } = await searchPlayer(token, {
      characterName,
      realm,
    });
    if (playerSearchData) {
      setPlayerData(playerSearchData);
    } else {
      console.error(error);
    }
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="bg-gray-800 text-white p-4 font-mono">
      <h1 className="text-left text-2xl">Alt Oracle</h1>
      <form onSubmit={searchPlayerByName} className="m-4 p-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="bg-gray-700 text-white rounded p-2 mr-2 border-2 border-gray-500 w-64"
          placeholder="Mylittlepig-Tichondrius"
        />
        <button
          type="submit"
          className={`relative bg-gray-700 text-white p-2 px-4 rounded transition duration-200 ease-in-out group border-2 border-gray-500 outline-none focus:outline-glow focus:ring-2 focus:ring-yellow-400 focus:border-gray-500`}
          
        >
          Expose Rat
        </button>
      </form>
      <Profile playerData={playerData} query={query} />
    </div>
  );
}

export default SearchBar;
