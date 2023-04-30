import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { searchPlayer } from './Api';
import Profile from './Profile';
import { useContext } from 'react';
import { TokenContext } from './TokenContext';





function SearchBar() {
    const [query, setQuery] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const token = useContext(TokenContext);

    // useEffect(() => {
    //     console.log(playerData);
    //   }, [playerData]);

    async function searchPlayerByName(event) {
        event.preventDefault();
        const [characterName, realm] = query.split('-');
        
        //This creates two new variables, playerSearchData and error. The data property from the 
        //returned object is assigned to the playerSearchData variable, and the error property remains as is.
        const { data: playerSearchData, error} = await searchPlayer(token, {characterName, realm});
        if (playerSearchData) {
            setPlayerData(playerSearchData);
        } else {
            console.error(error)
        }
    }
    
    function handleChange(e) {
      //hit api, search character name with server attached
        setQuery(e.target.value);
    }

    return (
        <div>
          <form onSubmit={searchPlayerByName}>
            <input type="text" value={query} onChange={handleChange} default= "Mylittlepig-tichondrius" placeholder="Mylittlepig-tichondrius"/>
            <button type="submit">Find the rat and expose it</button>
          </form>
          <Profile 
            playerData={playerData}
            query={query} />
        </div>
      );
      
}

export default SearchBar;