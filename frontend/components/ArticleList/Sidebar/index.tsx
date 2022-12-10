/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { css } from "@emotion/react";

const sideBar = css`
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  margin-left: 0px;
`;

const profile = css`
  display: flex;
`;

const author = css`
  margin-left: 10px;
`

const authorName = css`
  font-weight: bold;
`;

const authorDescription = css`
`

export const Sidebar = (): JSX.Element => (
  <div css={sideBar}>
    <div>
      <div css={profile}>
        <img width="20%" src="cflat.svg" />
        <div css={author}>
          <div css={authorName}>CFLAT</div>
          <div css={authorDescription}>どこかの会社のフロントもバックもやるデベロッパーっぽい人</div>
        </div>
      </div>
    </div>
  </div>
);
