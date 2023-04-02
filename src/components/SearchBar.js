import axios from 'axios';
import React, { useState } from 'react';
import { searchPlayer } from './Api';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [playerData, setPlayerData] = useState(null);

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={handleChange}/>
            <button type="submit"> Find the rat and expose it </button> 
        </form>
    );

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const [realm, characterName] = query.split('-');
        //console.log(realm);
        //console.log(characterName);

        searchPlayer({realm, characterName})
            .then(data => {
                setPlayerData(data);
            })
            .catch(error => {
                console.log(error);
            })

    }
}

export default SearchBar;