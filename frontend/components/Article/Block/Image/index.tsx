import { css } from "@emotion/react";
import Image from "next/image";
import { Image as ImageType } from "../../../../types/article";

type Props = {
  image: ImageType;
};

const imageBlock = css`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  max-width: 100%;
  height: 40vw;
  max-height: 400px;
`;

const imageStyle = css`
  object-fit: contain;
`;

// NOTE: Imageにlint効かせたいので命名妥協
export const ImageBlock = ({ image }: Props): JSX.Element => (
  <div css={imageBlock}>
    <Image css={imageStyle} src={`${image.url}`} fill alt="" />
  </div>
);
