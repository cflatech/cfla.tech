import { Item } from "./Item";

export const List = (): JSX.Element => {
  const items = [
    {
      id: "1",
      title: "記事タイトル",
    },
    {
      id: "2",
      title: "記事タイトル2",
    },
  ];

  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
