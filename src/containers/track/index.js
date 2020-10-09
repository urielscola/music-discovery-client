import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, MainInfo, MediaGroup, Footer } from 'components';
import { API } from 'services';

const Track = ({ match }) => {
  const [track, setTrack] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = useCallback(
    async response => {
      try {
        setRecommendations([]);
        const {
          acousticness,
          energy,
          instrumentalness,
          mode,
          danceability,
          tempo,
          key,
          loudness,
          speechiness,
          time_signature,
          valence
        } = await API.getTrackAnalysis(match.params.id);
        const recommended = await API.getRecommendations({
          seed_artists: [response.artists[0].id],
          target_energy: energy,
          target_acousticness: acousticness,
          target_instrumentalness: instrumentalness,
          target_tempo: tempo,
          target_mode: mode,
          target_valence: valence,
          target_key: key,
          target_loudness: loudness,
          target_speechiness: speechiness,
          target_time_signature: time_signature,
          target_danceability: danceability
        });
        setRecommendations(recommended);
      } catch (err) {
        console.log(err);
      }
    },
    [match.params.id]
  );

  const fetchArtist = useCallback(async () => {
    try {
      setTrack(null);
      const response = await API.getTrack(match.params.id);
      setTrack(response);
      fetchRecommendations(response);
    } catch (err) {
      console.log(err);
    }
  }, [match.params.id]);

  useEffect(() => {
    fetchArtist();
  }, [match.params.id]);

  return (
    <>
      <Header />
      <Grid.Container>
        {track && (
          <MainInfo
            image={track.album.images[0].url}
            title={track.name}
            subtitle={
              <Link to={`/artist/${track.artists[0].id}`}>
                {track.artists[0].name}
              </Link>
            }
          />
        )}
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

export default Track;
