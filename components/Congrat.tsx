/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';

import useMeasure from '../lib/useMeasure';
import usePrevious from '../lib/usePrevious';

const CONTENT_PADDING = 32;

const Root = styled.div`
  width: 100%;
  margin-bottom: 10px;
  h4,
  p {
    margin: 0;
  }
  .profile-box {
    width: 100%;
    height: ${(90 * 375) / 307}px;
    display: flex;
    cursor: pointer;
    .profile-img {
      width: 90px;
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
        font-weight: 500;
      }
    }
  }
  .content-box {
    overflow: hidden;
    .content {
      padding: ${CONTENT_PADDING}px 0;
    }
  }
`;

interface Props {
  id: number;
  name: string;
  content: string;
}
const Congrat: React.FC<Props> = ({ id, name, content, ...props }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const previous = usePrevious(open);
  const [bind, { height: viewHeight }] = useMeasure();
  const [{ height, y }, setSpring] = useSpring(
    {
      height: 0,
      y: 0,
    },
    [],
  );

  React.useEffect(() => {
    setSpring({
      height: open ? (viewHeight ?? 0) + 2 * CONTENT_PADDING : 0,
      y: open ? 50 : 0,
    });
  }, [setSpring, viewHeight, open]);

  return (
    <Root {...props}>
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
        <img
          className="profile-img"
          alt={name}
          src={`/images/congrats_profile/${id}.jpg`}
        />
        <div className="summary">
          <a.div style={{ height: y }} />
          <h4 className="division">축사</h4>
          <p className="name">{name}</p>
        </div>
      </div>
      <a.div
        className="content-box"
        style={{ height: open && previous === open ? 0 : height }}>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: content.split('\n').join('<br />'),
          }}
          {...bind}
        />
      </a.div>
    </Root>
  );
};

export default Congrat;
