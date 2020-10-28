import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import AppContext from '../../AppContext';

const Root = styled(a.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: white;
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: column;
  z-index: 99;
  .profile-close-button {
    position: absolute;
    right: 10px;
    border-radius: 50%;
    background-color: #9e9e9e;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    padding: 0;
    z-index: 1;
    svg {
      font-size: 25px;
      color: white;
    }
  }
  .profile-block {
    padding: 12px 8px;
    position: relative;
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
  .divider {
    width: 100%;
    height: 1px;
    background: #9e9e9e;
  }
  .other-photos {
    padding: 12px 8px;
    flex-grow: 1;
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
  &.desktop {
    bottom: 100%;
    background: #2a2b2c;
    border-radius: 5px;
    .profile-close-button {
      background-color: #515253;
    }
    .profile-block {
      padding: 12px;
      .name-and-position {
        margin-left: 10px;
        .artist-name {
          margin-top: 0;
          font-size: 1.5625rem;
          color: white;
        }
        .position {
          font-size: 1rem;
          color: #98999a;
        }
      }
    }
    .divider {
      width: calc(100% - 16px);
      margin-left: 8px;
    }
    .other-photos {
      padding: 12px;
      flex-grow: 1;
      h6 {
        font-size: 1rem;
        color: #98999a;
      }
      .thumb-list {
        height: 118px;
        display: grid;
        grid-gap: 4px;
        grid-template-columns: repeat(auto-fit, 118px);
      }
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
  previous?: boolean;
  close: () => void;
  artist: ArtistWithPhotos;
  handleGoTo: (photoId: number) => void;
}
const Profile: React.FC<props> = ({
  open,
  previous,
  close,
  artist,
  handleGoTo,
  ...props
}) => {
  const { withLayout } = React.useContext(AppContext);
  const maxHeight = React.useMemo(() => (!withLayout ? 350 : 360), [
    withLayout,
  ]);
  const [{ height, y }, setSpring] = useSpring(
    () => ({
      height: previous ? maxHeight : 0,
      y: previous ? 0 : maxHeight + 30,
      config: { tension: 500, friction: 50 },
    }),
    [],
  );

  React.useEffect(() => {
    if (!withLayout) setSpring({ y: open ? 0 : maxHeight + 30 });
    else setSpring({ height: open ? maxHeight : 0 });
  }, [withLayout, open, setSpring, maxHeight]);

  return (
    <Root
      className={withLayout ? 'desktop' : ''}
      style={{
        height: !withLayout ? maxHeight : height,
        y: !withLayout ? y : 0,
      }}
      {...props}>
      <div className="profile-block">
        <Image
          alt={artist.name}
          src={`/images/profile/${artist.artistId}.jpg`}
          width={117}
          height={156}
          priority
        />
        <div className="name-and-position">
          <h4 className="artist-name">{artist.name}</h4>
          <p className="position">{artist.position}</p>
        </div>
        <IconButton
          className="profile-close-button"
          onClick={async () => close()}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="divider" />
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
