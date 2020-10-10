import { setQuery } from 'utils';
import instance, { defaultHeaders } from './instance';

const ENDPOINT = process.env.REACT_APP_API_URL;
export const LOGIN_ENDPOINT = `${ENDPOINT}/login`;

const API = {
  getUser: async () => {
    const { user } = await instance({
      url: `${ENDPOINT}/me`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return user;
  },

  getUserTopArtists: async () => {
    const { artists } = await instance({
      url: `${ENDPOINT}/me/artists`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return artists.items.map(item => ({ ...item, image: item.images[0].url }));
  },

  getUserTopTracks: async () => {
    const { tracks } = await instance({
      url: `${ENDPOINT}/me/tracks`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return tracks.items.map(item => ({
      ...item,
      image: item.album.images[0].url
    }));
  },

  getArtist: async id => {
    const { data } = await instance({
      url: `${ENDPOINT}/artists/${id}`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return data;
  },

  getTrack: async id => {
    const { data } = await instance({
      url: `${ENDPOINT}/tracks/${id}`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return data;
  },

  getTrackAnalysis: async id => {
    const { data } = await instance({
      url: `${ENDPOINT}/tracks/${id}/analysis`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return data;
  },

  getArtistTopTracks: async id => {
    return instance({
      url: `${ENDPOINT}/artists/${id}/top-tracks`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });
  },

  getArtistRelated: async id => {
    const { data } = await instance({
      url: `${ENDPOINT}/artists/${id}/related`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return data.artists.slice(0, 12).map(item => ({
      ...item,
      image: item.images.length > 0 ? item.images[0].url : ''
    }));
  },

  getRecommendations: async params => {
    const query = setQuery(params);
    const { data } = await instance({
      url: `${ENDPOINT}/tracks/recommendations?${query}`,
      method: 'GET',
      headers: { ...defaultHeaders }
    });

    return data.tracks
      .filter(item => !!item.preview_url)
      .map(item => ({
        ...item,
        image: item.album.images[0].url
      }));
  },

  createPlaylist: async name => {
    const { data } = await instance({
      url: `${ENDPOINT}/playlists`,
      method: 'POST',
      data: { name },
      headers: { ...defaultHeaders }
    });

    return data;
  },

  addToPlaylist: async (id, tracks) => {
    const { data } = await instance({
      url: `${ENDPOINT}/playlists/${id}/tracks`,
      method: 'POST',
      data: { tracks },
      headers: { ...defaultHeaders }
    });

    return data;
  }
};

export default API;
