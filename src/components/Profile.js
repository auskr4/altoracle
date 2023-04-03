import React, { useState, useEffect } from 'react';
import { accessToken, getCharacterPvpSummary } from './Api';

function Profile({ playerData, query }) {
    const [pvpSummary, setPvpSummary] = useState(null);

    async function searchPvPSummary() {
        const [characterName, realm] = query.split('-');
        const { data: pvpSummaryData, error} = await getCharacterPvpSummary(accessToken, {characterName, realm});
        console.log('after the getCharacterPvpSummary call')
        if (pvpSummaryData) {
            setPvpSummary(pvpSummaryData);
        } else {
            console.error(error)
        }
    }

    useEffect(() => {
        if (playerData) {
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
            <p>{JSON.stringify(pvpSummary)}</p>
        </div>
    )
}

export default Profile;
