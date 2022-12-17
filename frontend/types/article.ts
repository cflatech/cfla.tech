// TODO: バックエンドと型を共有する仕組みを入れる
// てか、入れないとblocksの型定義が…
export type Article = {
  id: string;
  title: string;
  date: string;
  blocks: ArticleBlock[];
};

export type ArticleBlock = Code | Header | Paragraph | Link;

export type Code = {
  type: "code";
  text: string;
  language: string;
};

export type Header = {
  type: "header";
  text: string;
};

export type Paragraph = {
  type: "paragraph";
  text: string;
};

export type Link = {
  type: "link";
  text: string;
  link: string;
};
