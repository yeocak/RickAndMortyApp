import axios from "axios";

const baseURL = "https://rickandmortyapi.com"

const getCharacters = async () => {
    const request = await axios.get(`${baseURL}/api/character?page=1`)
    return request.data
};

const getByLink = async (link) => {
    const request = await axios.get(link)
    return request.data
};

const getLocations = async () => {
    const request = await axios.get(`${baseURL}/api/location`)
    return request.data
};

const getEpisodes = async () => {
    const request = await axios.get(`${baseURL}/api/episode`)
    return request.data
};

export {getCharacters, getByLink, getLocations, getEpisodes};