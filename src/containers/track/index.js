import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAlert } from 'react-alert';
import { Grid, Header, MainInfo, MediaGroup, Footer, Text } from 'components';
import { API } from 'services';

const Track = ({ match }) => {
  const intl = useIntl();
  const alert = useAlert();
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
        alert.show(intl.formatMessage({ id: 'track.error.recommendations' }), {
          timeout: 5000,
          type: 'danger'
        });
      }
    },
    [intl, alert, match.params.id]
  );

  const fetchArtist = useCallback(async () => {
    try {
      setTrack(null);
      const response = await API.getTrack(match.params.id);
      setTrack(response);
      fetchRecommendations(response);
    } catch (err) {
      alert.show(intl.formatMessage({ id: 'track.error.getTrack' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, match.params.id]);

  const savePlaylist = useCallback(async () => {
    try {
      const name = `${track.name} - Playlist`;
      const playlist = await API.createPlaylist(name);
      const tracks = recommendations.map(item => item.uri);
      await API.addToPlaylist(playlist.id, tracks);
      alert.show(intl.formatMessage({ id: 'track.feedback.savePlaylist' }), {
        timeout: 5000,
        type: 'success'
      });
    } catch (err) {
      alert.show(intl.formatMessage({ id: 'track.error.savePlaylist' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, track, recommendations]);

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
                {intl.formatMessage({ id: 'global.from' })}{' '}
                {track.artists[0].name}
              </Link>
            }
          />
        )}
        <MediaGroup
          title={intl.formatMessage({ id: 'track.media.suggestedPlaylist' })}
          items={recommendations}
          type="track"
          actions={
            <Text textDecoration="underline" onClick={savePlaylist}>
              {intl.formatMessage({ id: 'track.media.savePlaylist' })}
            </Text>
          }
        />
      </Grid.Container>
      <Footer />
    </>
  );
};

export default Track;
