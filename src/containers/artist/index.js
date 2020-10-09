import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Header,
  MainInfo,
  MediaGroup,
  Footer,
  Tags,
  Statistics
} from 'components';
import { API } from 'services';

const Artist = ({ match }) => {
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const fetchArtist = useCallback(async () => {
    try {
      setArtist(null);
      const response = await API.getArtist(match.params.id);
      setArtist(response);
    } catch (err) {
      console.log(err);
    }
  }, [match.params.id]);

  const fetchTopTracks = useCallback(async () => {
    try {
      setRelatedArtists([]);
      const response = await API.getArtistTopTracks(match.params.id);
      setTopTracks(
        response.data.tracks.map(track => ({
          ...track,
          image: track.album.images[0].url
        }))
      );
    } catch (err) {
      console.log(err);
    }
  }, [match.params.id]);

  const fetchRelated = useCallback(async () => {
    try {
      setRelatedArtists([]);
      const response = await API.getArtistRelated(match.params.id);
      const promises = response.map(item => API.getArtistTopTracks(item.id));
      const artistsTopTracks = await Promise.allSettled(promises);
      artistsTopTracks.forEach(({ status, value }, i) => {
        if (status === 'fulfilled' && value.data.tracks.length > 0) {
          response[i].preview_url = value.data.tracks[0].preview_url;
        }
      });
      setRelatedArtists(response);
    } catch (err) {
      console.log(err);
    }
  }, [match.params.id]);

  const fetchRecommendations = useCallback(async () => {
    try {
      setRecommendations([]);
      const response = await API.getRecommendations({
        seed_artists: [match.params.id]
      });
      setRecommendations(response);
    } catch (err) {
      console.log(err);
    }
  }, [match.params.id]);

  useEffect(() => {
    fetchArtist();
    fetchTopTracks();
    fetchRelated();
    fetchRecommendations();
  }, [match.params.id]);

  return (
    <>
      <Header />
      <Grid.Container>
        {artist && (
          <>
            <MainInfo image={artist.images[0].url} title={artist.name} />
            <Tags items={artist.genres} />
            <Statistics
              items={[
                { label: 'Followers', count: artist.followers.total },
                { label: 'Popularity', count: `${artist.popularity}%` }
              ]}
            />
          </>
        )}
        <MediaGroup
          title={`${artist ? artist.name : ''} top tracks`}
          items={topTracks}
          type="track"
        />
        <MediaGroup
          title={`${artist ? artist.name : ''} related artists`}
          items={relatedArtists}
          type="artist"
        />
        <MediaGroup
          title="Suggested playlist"
          items={recommendations}
          type="track"
        />
      </Grid.Container>
      <Footer />
    </>
  );
};

export default Artist;
