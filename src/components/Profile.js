import React, { useState, useEffect } from 'react';
import { accessToken, getCharacterPvpSummary } from './Api';
import { useContext } from 'react';
import { TokenContext } from './TokenContext';


function Profile({ playerData, query }) {
    const [pvpSummary, setPvpSummary] = useState(null);
    const token = useContext(TokenContext);

    async function searchPvPSummary() {
        const [characterName, realm] = query.split('-');

        const { data: pvpSummaryData, error} = await getCharacterPvpSummary(token, {characterName, realm});
        //console.log('after the getCharacterPvpSummary call')
        if (pvpSummaryData) {
            setPvpSummary(pvpSummaryData);
            console.log(`pvpSummaryData: ${pvpSummary}`);
        } else {
            console.error(`error: ${error}`)
        }
    }

    useEffect(() => {
        if (playerData) {
            //console.log(playerData.pvp_summary);
            searchPvPSummary();
        }
    }, [playerData]);

    return (
        <div>
            {playerData && (
            <div>
              <h2>{playerData.name}</h2>
              <p>Level {playerData.level} {playerData.active_spec.name} {playerData.character_class.name}</p>
              {/* more Ponies */}
            </div>
            )}
            {/* Adjust the rendering logic for pvpSummary if needed */}
            <p>3v3 Rating: {pvpSummary && pvpSummary.rating}</p>
        </div>
    )
}

export default Profile;
