import React, { useState, useEffect } from 'react';
import { getCharacterModel } from './Api';
import { useContext } from 'react';
import { TokenContext } from './TokenContext';


function CharacterModel({ playerData, query }) {
    const [model, setModel] = useState(null)
    const token = useContext(TokenContext);

    const [characterName, realm] = query

    async function searchModel() {
        const { data: characterModelData, error } = await getCharacterModel(token, { characterName, realm });
        if (characterModelData) {
            setModel(characterModelData)
        } else {
            console.error(`error: ${error}`);
        }
    }
    

    useEffect(() => {
        if (playerData) {
            searchModel();
        }
    }, [playerData]);

    return (
        <div>
            {playerData && (
            <div>
                model: {model}
            </div>
            )}
        </div>
    )
}

export default CharacterModel;