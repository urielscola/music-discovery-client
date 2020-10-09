import React, { memo } from 'react';
import { FlexDiv, Text, Media } from 'components';
import Skeleton from 'react-loading-skeleton';
import * as Styles from './styles';

const MediaGroup = ({ title, items, type }) => (
  <FlexDiv flexDirection="column" margin="30px 0">
    <Text size="x-large" appearence="bold" marginBottom="25px">
      {items.length === 0 ? <Skeleton width={200} height={35} /> : title}
    </Text>
    <Styles.Grid>
      {items.length === 0 &&
        new Array(20)
          .fill('')
          .map((_, i) => <Skeleton key={i} width={150} height={213} />)}
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
          />
        ))}
    </Styles.Grid>
  </FlexDiv>
);

export default memo(MediaGroup);
