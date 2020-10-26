import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import AppContext from '../AppContext';

const Root = styled.div`
  .photo-list-item-img {
    width: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
  .caption-block {
    width: 100%;
    height: 48px;
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
`;

interface props {
  photo: PhotoWithArtist;
}
const PhotoListItem: React.FC<props> = ({ photo, ...props }) => {
  const router = useRouter();
  const { setIndex, withLayout } = React.useContext(AppContext);

  const handleMove = React.useCallback(() => {
    setIndex(photo.photoId);
    router.push('/ovr');
  }, [photo.photoId, router, setIndex]);

  return (
    <Root
      id={`photo-list-item-${photo.photoId}`}
      className={`${withLayout ? 'desktop' : 'mobile'}`}
      role="button"
      tabIndex={0}
      onClick={() => handleMove()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleMove();
      }}
      {...props}>
      <img
        className="photo-list-item-img"
        alt={photo.title}
        src={`/images/photo/thumb/${photo.photoId}.jpg`}
      />
      <div className="caption-block">
        <h4>{photo.title}</h4>
        <p>{photo.artist?.name}</p>
      </div>
    </Root>
  );
};

export default PhotoListItem;
