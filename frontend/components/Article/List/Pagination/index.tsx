import { css } from "@emotion/react";
import Link from "next/link";
import { useArticleItems } from "../../../../hooks/useArticleItems";
import { styles } from "../../../../styles/styles";

const pagination = css`
  display: flex;
  justify-content: space-between;
`;

const button = css`
  text-align: center;
  border-radius: 15px;
  font-weight: bold;
  margin: 10px;
  margin-bottom: 0px;
  width: calc(${styles.layouts.maxWidth}px / 10);
`;

type Props = {
  page: number;
};

export const Pagination = ({ page }: Props): JSX.Element | null => {
  const beforeItems = useArticleItems(page + 1);

  return (
    <div css={pagination}>
      {page > 1 ? (
        <Link href={`/?page=${page - 1}`}>
          <div css={button}>次のページ</div>
        </Link>
      ) : (
        <div> </div>
      )}
      {!beforeItems.isLoading && beforeItems.items.length > 0 && (
        <Link href={`/?page=${page + 1}`}>
          <div css={button}>前のページ</div>
        </Link>
      )}
    </div>
  );
};
