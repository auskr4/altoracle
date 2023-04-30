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

const get3v3Rating = async (accessToken, query) => {
  try {
    const response = await axios.get(
      `https://us.api.blizzard.com/profile/wow/character/${query.realm}/${query.characterName}/pvp-bracket/3v3?namespace=profile-us&locale=en_US`,
      //`https://us.api.blizzard.com/profile/wow/character/${query.realm}/${query.characterName}/achievements?namespace=profile-us`,
      //`https://us.api.blizzard.com/profile/wow/character/${query.realm}/${query.characterName}?namespace=profile-us&locale=en_US`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      }
    );
    return {data: response.data, error: null};
  } catch(error) {
    console.log('Error getting 3v3 rating:', error);
    return { data: null, error: error};
  }
} 

const get2v2Rating = async (accessToken, query) => {
  try {
    const response = await axios.get(
      `https://us.api.blizzard.com/profile/wow/character/${query.realm}/${query.characterName}/pvp-bracket/2v2?namespace=profile-us&locale=en_US`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      }
    );
    return {data: response.data, error: null};
  } catch(error) {
    console.log('Error getting 2v2 rating:', error);
    return { data: null, error: error};
  }
} 
//const accessToken = getToken();

export { searchPlayer, getToken , get3v3Rating, get2v2Rating };