import React, { useState, useEffect } from 'react';
import { accessToken, get3v3Rating, get2v2Rating, getCharacterStats } from './Api';
import { useContext } from 'react';
import { TokenContext } from './TokenContext';


function Profile({ playerData, query }) {
    const [rating2v2, setRating2v2] = useState(null);
    const [rating3v3, setRating3v3] = useState(null);
    const [high3v3, setHigh3v3] = useState(null);
    const token = useContext(TokenContext);

    const [characterName, realm] = query

    async function searchRating3v3() {
        const { data: rating3v3Data, error} = await get3v3Rating(token, {characterName, realm});
        if (rating3v3Data) {
            setRating3v3(rating3v3Data);
        } else {
            console.error(`error: ${error}`)
        }
    }

    async function searchRating2v2() {
        const {data: rating2v2Data, error} = await get2v2Rating(token, {characterName, realm});
        if (rating2v2Data) {
            setRating2v2(rating2v2Data)
        } else {
            console.error(`error: ${error}`)
        }
    }

    async function searchHighest3v3() {
        const { data: high3v3Data, error } = await getCharacterStats(token, { characterName, realm });
        if (high3v3Data) {
            const ratedArenas = high3v3Data.categories.find(category => category.name === "Player vs. Player")
                                .sub_categories.find(subCategory => subCategory.name === "Rated Arenas");
            const highest3v3Rating = ratedArenas.statistics.find(statistic => statistic.name === "Highest 3v3 personal rating").quantity;
            setHigh3v3({ ...high3v3Data, highest3v3Rating });
        } else {
            console.error(`error: ${error}`);
        }
    }
    

    useEffect(() => {
        if (playerData) {
            searchRating3v3();
            searchRating2v2();
            searchHighest3v3();
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
                {rating2v2 && (
                <div>
                    <p>2v2 Rating: {rating2v2 && rating2v2.rating}</p>
                    <p>3v3 Rating: {rating3v3 && rating3v3.rating}</p>
                    <p>Highest 3v3 Rating: {high3v3 && high3v3.highest3v3Rating}</p>
                </div>
                )}
            </div>
        </div>
    )
}

export default Profile;