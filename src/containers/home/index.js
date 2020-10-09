import React, { useState, useEffect, useCallback } from 'react';
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
  const { user } = useAuthContext();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const fetchTopTracks = useCallback(async () => {
    try {
      const response = await API.getUserTopTracks();
      setTopTracks(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

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
      console.log(err);
    }
  }, []);

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
              items={[{ label: 'Followers', count: user.followers.total }]}
            />
          </>
        )}
        <MediaGroup title="Your top artists" items={topArtists} type="artist" />
        <MediaGroup title="Your top tracks" items={topTracks} type="track" />
      </Grid.Container>
      <Footer />
    </>
  );
};

export default Home;
