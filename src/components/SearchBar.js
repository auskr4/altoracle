import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { searchPlayer, getToken } from './Api';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        console.log(playerData);
      }, [playerData]);

    const searchPlayerByName = async (event) => {
        event.preventDefault();
        const [characterName, realm] = query.split('-');
        console.log(characterName, realm);
        const accessToken = await getToken();
        console.log(accessToken);
        const playerSearchData = await searchPlayer(accessToken, {characterName, realm});
        //console.log(playerSearchData);
        setPlayerData(playerSearchData);
        //console.log(playerData);
      };
    
    function handleChange(e) {
        setQuery(e.target.value);
    }

    return (
        <div>
          <form onSubmit={searchPlayerByName}>
            <input type="text" value={query} onChange={handleChange} />
            <button type="submit">Find the rat and expose it</button>
          </form>
          {playerData && (
            <div>
              <h2>{playerData.name}</h2>
              <p>Level {playerData.level} {playerData.active_spec.name} {playerData.character_class.name}</p>
              {/* more Ponies */}
            </div>
          )}
        </div>
      );
      
}

export default SearchBar;