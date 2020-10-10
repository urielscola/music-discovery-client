import React, { useState, useEffect, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useAlert } from 'react-alert';
import {
  Grid,
  Header,
  MainInfo,
  MediaGroup,
  Footer,
  Text,
  Tags,
  Statistics
} from 'components';
import { API } from 'services';

const Artist = ({ match }) => {
  const intl = useIntl();
  const alert = useAlert();
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
      alert.show(intl.formatMessage({ id: 'artist.error.getArtist' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, match.params.id]);

  const fetchTopTracks = useCallback(async () => {
    try {
      setRelatedArtists([]);
      const response = await API.getArtistTopTracks(match.params.id);
      setTopTracks(
        response.data.tracks.slice(0, 6).map(track => ({
          ...track,
          image: track.album.images[0].url
        }))
      );
    } catch (err) {
      alert.show(intl.formatMessage({ id: 'artist.error.getTopTracks' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, match.params.id]);

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
      alert.show(intl.formatMessage({ id: 'artist.error.related' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, match.params.id]);

  const fetchRecommendations = useCallback(async () => {
    try {
      setRecommendations([]);
      const response = await API.getRecommendations({
        seed_artists: [match.params.id]
      });
      setRecommendations(response);
    } catch (err) {
      alert.show(intl.formatMessage({ id: 'artist.error.recommendations' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, match.params.id]);

  const savePlaylist = useCallback(async () => {
    try {
      const name = `${artist.name} - Playlist`;
      const playlist = await API.createPlaylist(name);
      const tracks = recommendations.map(item => item.uri);
      await API.addToPlaylist(playlist.id, tracks);
      alert.show(intl.formatMessage({ id: 'artist.feedback.savePlaylist' }), {
        timeout: 5000,
        type: 'success'
      });
    } catch (err) {
      alert.show(intl.formatMessage({ id: 'artist.error.savePlaylist' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, recommendations, artist]);

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
                {
                  label: intl.formatMessage({
                    id: 'artist.statistics.followers'
                  }),
                  count: artist.followers.total.toLocaleString()
                },
                {
                  label: intl.formatMessage({
                    id: 'artist.statistics.popularity'
                  }),
                  count: `${artist.popularity}%`
                }
              ]}
            />
          </>
        )}
        <MediaGroup
          title={intl.formatMessage({ id: 'artist.media.topTracks' })}
          items={topTracks}
          type="track"
        />
        <MediaGroup
          title={intl.formatMessage({ id: 'artist.media.relatedArtists' })}
          items={relatedArtists}
          type="artist"
        />
        <MediaGroup
          title={intl.formatMessage({ id: 'artist.media.suggestedPlaylist' })}
          items={recommendations}
          type="track"
          actions={
            <Text textDecoration="underline" onClick={savePlaylist}>
              {intl.formatMessage({ id: 'artist.media.savePlaylist' })}
            </Text>
          }
        />
      </Grid.Container>
      <Footer />
    </>
  );
};

export default Artist;
