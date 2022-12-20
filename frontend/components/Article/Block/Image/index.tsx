import { css } from "@emotion/react";
import Image from "next/image";
import { useRef } from "react";
import { Image as ImageType } from "../../../../types/article";

type Props = {
  image: ImageType;
};

const imageBlock = css`
  width: 100%;
`;

// NOTE: Imageにlint効かせたいので命名妥協
export const ImageBlock = ({ image }: Props): JSX.Element => (
  <div css={imageBlock}>
    <Image src={`${image.url}`} width={600} height={600} alt="" />
  </div>
);
