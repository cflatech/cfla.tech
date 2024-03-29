// TODO: バックエンドと型を共有する仕組みを入れる
// てか、入れないとblocksの型定義が…
export type Article = {
  id: string;
  title: string;
  date: string;
  blocks: ArticleBlock[];
};

export type ArticleBlock =
  | Code
  | Header
  | Paragraph
  | Link
  | Image
  | BulletPointList;

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
  items: Item[];
};

export type Link = {
  type: "link";
  text: string;
  link: string;
};

export type BulletPointList = {
  type: "bulletPointList";
  items: BulletPoint[];
};

export type BulletPoint = {
  type: "bulletPoint";
  items: Item[];
};

export type Item = Text | Link;

export type Text = {
  type: "text";
  text: string;
  isCode: boolean;
};

export type Image = {
  type: "image";
  url: string;
};
