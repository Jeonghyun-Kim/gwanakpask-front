import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import AppContext from '../AppContext';

interface RootProps {
  infoHeight: number;
}
const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .photo-list-item-img {
    width: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
  .caption-block {
    width: 100%;
    height: ${(props) => props.infoHeight}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      font-size: 0.875rem;
      font-weight: 400;
      margin: 0;
      margin-top: 3px;
    }
    p {
      font-size: 0.625rem;
      font-weight: 400;
      margin: 0;
    }
  }
  &.desktop {
    .caption-block {
      h4 {
        font-size: 1.25rem;
        font-weight: 500;
      }
      p {
        font-size: 1rem;
      }
    }
  }
`;

interface props {
  photo: PhotoWithArtist;
  size: number;
  infoHeight: number;
}
const PhotoListItem: React.FC<props> = ({
  photo,
  size,
  infoHeight,
  ...props
}) => {
  const router = useRouter();
  const { setIndex, withLayout } = React.useContext(AppContext);

  const handleMove = React.useCallback(() => {
    setIndex(photo.photoId);
    router.push('/ovr');
  }, [photo.photoId, router, setIndex]);

  return (
    <Root
      id={`photo-list-item-${photo.photoId}`}
      className={withLayout ? 'desktop' : 'mobile'}
      infoHeight={infoHeight}
      role="button"
      tabIndex={0}
      onClick={() => handleMove()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleMove();
      }}
      {...props}>
      <Image
        className="photo-list-item-img"
        alt={photo.title}
        src={`/images/photo/thumb/${photo.photoId}.jpg`}
        width={size}
        height={size}
      />
      <div className="caption-block">
        <h4>{photo.title}</h4>
        <p>{photo.artist?.name}</p>
      </div>
    </Root>
  );
};

export default PhotoListItem;
