import React, { useState, useEffect } from 'react';
import { accessToken, get3v3Rating, get2v2Rating } from './Api';
import { useContext } from 'react';
import { TokenContext } from './TokenContext';


function Profile({ playerData, query }) {
    const [rating2v2, setRating2v2] = useState(null);
    const [rating3v3, setRating3v3] = useState(null);
    const token = useContext(TokenContext);

    async function searchRating3v3() {
        const [characterName, realm] = query.split('-');

        const { data: rating3v3Data, error} = await get3v3Rating(token, {characterName, realm});
        //console.log('after the getCharacterPvpSummary call')
        if (rating3v3Data) {
            setRating3v3(rating3v3Data);
            //console.log(`pvpSummaryData: ${pvpSummary}`);
        } else {
            console.error(`error: ${error}`)
        }
    }

    async function searchRating2v2() {
        const [characterName, realm] = query.split('-');

        const {data: rating2v2Data, error} = await get2v2Rating(token, {characterName, realm});
        if (rating2v2Data) {
            setRating2v2(rating2v2Data)
        } else {
            console.error(`error: ${error}`)
        }
    }

    useEffect(() => {
        if (playerData) {
            //console.log(playerData.pvp_summary);
            searchRating3v3();
            searchRating2v2()
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
            <div>
                <p>2v2 Rating: {rating2v2 && rating2v2.rating}</p>
                <p>3v3 Rating: {rating3v3 && rating3v3.rating}</p>
            </div>
        </div>
    )
}

export default Profile;