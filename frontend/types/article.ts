// TODO: バックエンドと型を共有する仕組みを入れる
export type Article = {
  id: string;
  title: string;
  date: string;
  content: {
    type: string;
    text: string;
  }[];
};
