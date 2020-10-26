import React from 'react';
import styled from 'styled-components';
import { useSpring, config } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Root = styled(a.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 350px;
  background: white;
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: column;
  & > div {
    padding: 12px 8px;
  }
  .close-button {
    left: initial !important;
    right: 10px;
    border-radius: 50%;
    background-color: #9e9e9e;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    padding: 0 !important;
    svg {
      font-size: 25px !important;
    }
  }
  .profile-block {
    display: flex;
    img {
      height: 156px;
      width: 117px;
      border-radius: 5px;
    }
    .name-and-position {
      flex-grow: 1;
      padding: 0 12px;
      .artist-name {
        margin: 8px 0;
        font-size: 1.25rem;
        font-weight: 400;
      }
      .position {
        margin: 3px 0;
        font-size: 0.75rem;
        font-weight: 400;
        color: #757575;
      }
    }
  }
  .other-photos {
    flex-grow: 1;
    border-top: 1px solid #9e9e9e;
    h6 {
      margin: -4px 0 8px 0;
      font-size: 0.75rem;
      font-weight: 400;
      color: #757575;
    }
    .thumb-list {
      height: 118px;
      display: grid;
      grid-gap: 3px;
      grid-template-columns: repeat(auto-fit, 118px);
    }
  }
`;

const ImageButton = styled.img`
  height: 100%;
  width: auto;
  border-radius: 5px;
`;

interface props {
  open: boolean;
  close: () => void;
  artist: ArtistWithPhotos;
  handleGoTo: (photoId: number) => void;
}
const Profile: React.FC<props> = ({
  open,
  close,
  artist,
  handleGoTo,
  ...props
}) => {
  const [{ y }, setSpring] = useSpring(
    () => ({
      y: 100,
      config: config.stiff,
    }),
    [],
  );
  const bind = useDrag(
    ({
      down,
      last,
      offset: [, offsetY],
      lastOffset: [, lastY],
      velocities: [, vy],
      cancel,
    }) => {
      const deltaY = offsetY - lastY;
      if (last && (deltaY > 200 || vy > 0.5)) {
        close();
        if (cancel) cancel();
      } else {
        setSpring({
          y: down && open && deltaY > 0 ? -350 + deltaY : -350,
        });
      }
    },
  );

  React.useEffect(() => {
    setSpring({ y: open ? -350 : 100 });
  }, [open, setSpring]);

  return (
    <Root style={{ y }} {...bind()} {...props}>
      <IconButton className="close-button" onClick={() => close()}>
        <CloseIcon />
      </IconButton>
      <div className="profile-block">
        <img alt={artist.name} src={`/images/profile/${artist.artistId}.jpg`} />
        <div className="name-and-position">
          <h4 className="artist-name">{artist.name}</h4>
          <p className="position">{artist.position}</p>
        </div>
      </div>
      <div className="other-photos">
        <h6>이 작가의 모든 작품</h6>
        <div className="thumb-list">
          {artist.photos.map((photo) => (
            <ImageButton
              key={photo.photoId}
              alt={photo.title}
              src={`/images/photo/thumb/${photo.photoId}.jpg`}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                close();
                e.currentTarget.blur();
                handleGoTo(photo.photoId);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  close();
                  e.currentTarget.blur();
                  handleGoTo(photo.photoId);
                }
              }}
            />
          ))}
        </div>
      </div>
    </Root>
  );
};

export default Profile;
