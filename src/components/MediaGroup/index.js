import React, { memo } from 'react';
import { FlexDiv, Text, Media } from 'components';
import Skeleton from 'react-loading-skeleton';
import * as Styles from './styles';

const MediaGroup = ({ title, items, type, actions }) => (
  <FlexDiv flexDirection="column" margin="50px 0">
    <FlexDiv alignItems="center" marginBottom="25px">
      <Text size="x-large" appearence="bold" marginRight="10px">
        {items.length === 0 ? <Skeleton width={200} height={35} /> : title}
      </Text>
      {actions}
    </FlexDiv>
    <Styles.Grid>
      {items.length === 0 &&
        new Array(12)
          .fill('')
          .map((_, i) => <Styles.MediaPlaceholder key={i} />)}
      {items.length > 0 &&
        items.map(item => (
          <Media
            type={type}
            id={item.id}
            image={item.image}
            title={item.name}
            key={item.id}
            previewUrl={item.preview_url}
            externalUrl={item.external_urls.spotify}
            artist={type === 'track' ? item.artists[0].name : null}
          />
        ))}
    </Styles.Grid>
  </FlexDiv>
);

export default memo(MediaGroup);
