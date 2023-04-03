import axios from "axios";

const clientId = process.env.REACT_APP_BLIZZARD_CLIENT_ID;
const clientSecret = process.env.REACT_APP_BLIZZARD_CLIENT_SECRET;

const getToken = async () => {
  try {
    const response = await axios.post('https://us.battle.net/oauth/token', null, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
      params: {
        grant_type: 'client_credentials',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

const searchPlayer = async (accessToken, query) => {
    try {
      const response = await axios.get(
        `https://us.api.blizzard.com/profile/wow/character/${query.realm}/${query.characterName}?namespace=profile-us&locale=en_US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error getting character profile:', error);
      return { data: null, error: error };
    }
  };

const getCharacterPvpSummary = async (accessToken, query) => {
  console.log('getCharacterPvpSummary has been called')
  try {
    const response = await axios.get(
      `https://us.api.blizzard.com/profile/wow/character/${query.realm}/${query.characterName}/pvp-summary`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      }
    );
    return {data: response.data, error: null};
  } catch(error) {
    console.log('Error getting PVP summary:', error);
    return { data: null, error: error};
  }
} 

const accessToken = getToken();

export { searchPlayer, accessToken , getCharacterPvpSummary };