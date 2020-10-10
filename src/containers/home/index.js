import React, { useState, useEffect, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useAlert } from 'react-alert';
import {
  Grid,
  Header,
  MainInfo,
  MediaGroup,
  Footer,
  Statistics
} from 'components';
import { useAuthContext } from 'contexts';
import { API } from 'services';

const Home = () => {
  const intl = useIntl();
  const alert = useAlert();
  const { user } = useAuthContext();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const fetchTopTracks = useCallback(async () => {
    try {
      const response = await API.getUserTopTracks();
      setTopTracks(response);
    } catch (err) {
      alert.show(intl.formatMessage({ id: 'home.error.topTracks' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert]);

  const fetchTopArtists = useCallback(async () => {
    try {
      const response = await API.getUserTopArtists();
      const promises = response.map(item => API.getArtistTopTracks(item.id));
      const artistsTopTracks = await Promise.allSettled(promises);
      artistsTopTracks.forEach(({ status, value }, i) => {
        if (status === 'fulfilled' && value.data.tracks.length > 0) {
          response[i].preview_url = value.data.tracks[0].preview_url;
        }
      });
      setTopArtists(response);
    } catch (err) {
      alert.show(intl.formatMessage({ id: 'home.error.topArtists' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert]);

  useEffect(() => {
    fetchTopArtists();
    fetchTopTracks();
  }, []);

  return (
    <>
      <Header />
      <Grid.Container>
        {user && (
          <>
            <MainInfo
              image={user.images.length ? user.images[0].url : ''}
              title={user.display_name}
            />
            <Statistics
              items={[
                {
                  label: intl.formatMessage({ id: 'home.statistic.followers' }),
                  count: user.followers.total
                }
              ]}
            />
          </>
        )}
        <MediaGroup
          title={intl.formatMessage({ id: 'home.media.topArtists' })}
          items={topArtists}
          type="artist"
        />
        <MediaGroup
          title={intl.formatMessage({ id: 'home.media.topTracks' })}
          items={topTracks}
          type="track"
        />
      </Grid.Container>
      <Footer />
    </>
  );
};

export default Home;
