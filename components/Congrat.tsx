/* eslint-disable react/no-danger */
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';

import useMeasure from '../lib/hooks/useMeasure';
import usePrevious from '../lib/hooks/usePrevious';

import AppContext from '../AppContext';

const CONTENT_PADDING = {
  mobile: 32,
  desktop: 48,
};

const Root = styled.div`
  width: 100%;
  background-color: white;
  h4,
  p {
    margin: 0;
  }
  .profile-box {
    width: 100%;
    height: 120px;
    display: flex;
    cursor: pointer;
    .profile-img {
      height: 100%;
      object-fit: contain;
    }
    .summary {
      display: flex;
      flex-direction: column;
      margin: 8px 10px;
      .division {
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 10px;
      }
      .name {
        font-size: 0.875rem;
        font-weight: 400;
      }
    }
  }
  .content-box {
    overflow: hidden;
    .content {
      padding: ${CONTENT_PADDING.mobile}px 16px;
      font-size: 0.875rem;
      font-weight: 400;
    }
  }
  &.desktop {
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .profile-box {
      width: 100%;
      height: 240px;
      .summary {
        display: flex;
        flex-direction: column;
        margin: 16px 36px;
        .division {
          font-size: 1.5625rem;
          letter-spacing: 16px;
        }
        .name {
          font-size: 1.5625rem;
        }
      }
    }
    .content-box {
      .content {
        padding: ${CONTENT_PADDING.desktop}px 32px;
        font-size: 1.25rem;
        /* word-break: keep-all; */
      }
    }
  }
`;

interface Props {
  id: number;
  name: string;
  content: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}
const Congrat: React.FC<Props> = ({
  id,
  name,
  content,
  defaultOpen = false,
  children,
  ...props
}) => {
  const { withLayout } = React.useContext(AppContext);
  const [open, setOpen] = React.useState<boolean>(defaultOpen);
  const previous = usePrevious(open);
  const [bind, { height: viewHeight }] = useMeasure();
  // const padding = React.useMemo(
  //   () => (!withLayout ? CONTENT_PADDING.mobile : CONTENT_PADDING.desktop),
  //   [withLayout],
  // );

  const [{ height }, setSpring] = useSpring(
    {
      // height: open ? (viewHeight ?? 0) + 2 * padding : 0,
      height: open ? viewHeight ?? 0 : 0,
    },
    [],
  );

  React.useEffect(() => {
    setSpring({
      // height: open ? (viewHeight ?? 0) + 2 * padding : 0,
      height: open ? viewHeight ?? 0 : 0,
    });
  }, [setSpring, viewHeight, open]);

  return (
    <Root className={`congrat ${withLayout ? 'desktop' : ''}`} {...props}>
      <div
        className="profile-box"
        onClick={(e) => {
          setOpen(!open);
          e.currentTarget.blur();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setOpen(!open);
            e.currentTarget.blur();
          }
        }}>
        <Image
          className="profile-img"
          alt={name}
          src={`/images/congrats_profile/${id}.jpg`}
          width={!withLayout ? 98 : 196}
          height={!withLayout ? 120 : 240}
        />
        <div className="summary">
          <div className="grow" />
          <h4 className="division">축사</h4>
          <p className="name">{name}</p>
        </div>
      </div>
      <a.div
        className="content-box"
        style={{ height: !open && previous === open ? 0 : height }}>
        <div {...bind}>
          {children}
          <p
            className="content"
            dangerouslySetInnerHTML={{
              __html: content.split('\n').join('<br />'),
            }}
          />
        </div>
      </a.div>
    </Root>
  );
};

export default Congrat;
