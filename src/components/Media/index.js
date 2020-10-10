import React, { memo, useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FlexDiv, Text, Icon } from 'components';
import { theme } from 'assets/styles';
import * as Styles from './styles';

const Media = ({ title, image, id, externalUrl, previewUrl, type, artist }) => {
  const intl = useIntl();

  const ref = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const _play = useCallback(() => {
    if (ref && ref.current && previewUrl) {
      setIsPlaying(true);
      ref.current.play();
    }
  }, [previewUrl]);

  const _pause = useCallback(() => {
    if (ref && ref.current && previewUrl) {
      setIsPlaying(false);
      ref.current.pause();
    }
  }, [previewUrl]);

  return (
    <Styles.Container onMouseEnter={_play} onMouseLeave={_pause}>
      <Link to={`/${type}/${id}`}>
        <Icon
          variant="spotify"
          color={theme.green}
          size={20}
          position="absolute"
          zIndex="1"
          left="5px"
          top="5px"
          onClick={() => window.open(externalUrl)}
        />
        {isPlaying && (
          <Icon
            variant="play"
            size={20}
            color={theme.green}
            position="absolute"
            right="5px"
            top="5px"
            z-index="1"
          />
        )}
        <FlexDiv
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="30px 0"
          position="relative"
        >
          <Styles.Image src={image} alt={title} />
          {artist && (
            <Text marginTop="15px" size="small" color={theme.black}>
              {intl.formatMessage({ id: 'global.from' })}{' '}
              {artist.length > 13 ? `${artist.slice(0, 13)}...` : artist}
            </Text>
          )}
        </FlexDiv>
        <Styles.Footer>
          <Text appearence="bold" color={theme.black}>
            {title.length > 12 ? `${title.slice(0, 12)}...` : title}
          </Text>
        </Styles.Footer>
      </Link>
      {previewUrl && (
        <Styles.Preview src={previewUrl} preload="auto" ref={ref} loop>
          O seu navegador não suporta o elemento <code>audio</code>.
        </Styles.Preview>
      )}
    </Styles.Container>
  );
};

export default memo(Media);
