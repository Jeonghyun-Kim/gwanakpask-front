import React from 'react';
import styled from 'styled-components';

import AppContext from '../AppContext';

interface RootProps {
  size: number;
}
const Root = styled.div<RootProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size + 48}px;
  .photo-list-item-img {
    width: 100%;
    object-fit: contain;
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
      margin: 5px 0;
    }
    p {
      font-size: 0.625rem;
      font-weight: 400;
      margin: 0;
    }
  }
`;

interface props {
  photo: Photo;
  artistName: string;
  size: number;
}
const PhotoListItem: React.FC<props> = ({
  photo,
  artistName,
  size,
  ...props
}) => {
  const { withLayout } = React.useContext(AppContext);

  return (
    <Root
      id={`photo-list-item-${photo.photoId}`}
      className={`${withLayout ? 'desktop' : ''}`}
      size={size}
      {...props}>
      <img
        className="photo-list-item-img"
        alt={photo.title}
        src={`/images/photo/thumb/${photo.photoId}.jpg`}
      />
      <div className="caption-block">
        <h4>{photo.title}</h4>
        <p>{artistName}</p>
      </div>
    </Root>
  );
};

export default PhotoListItem;
