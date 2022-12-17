import { css } from "@emotion/react";
import { Paragraph as ParagraphType } from "../../../types/article";

type Props = {
  paragraph: ParagraphType;
};

const paragraphStyle = css`
  margin: 5px;
`;

export const Paragraph = ({ paragraph }: Props): JSX.Element => (
  <div css={paragraphStyle}>{paragraph.text}</div>
);
