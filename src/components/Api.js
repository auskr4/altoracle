import axios from "axios";

const api_key = '';

function searchPlayer(query) {
    const endpoint = `https://us.api.blizzard.com/profile/wow/character/${query.realm}/${query.characterName}?namespace=profile-us&locale=en_US&access_token=${api_key}`;
    return axios.get(endpoint)
        .then(res => {
            return res.data;
        })
}

export { searchPlayer };