import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { styles } from "../../../../styles/styles";
import { Code as CodeType } from "../../../../types/article";

type Props = {
  code: CodeType;
};

export const Code = ({ code }: Props): JSX.Element => (
  <SyntaxHighlighter
    language={code.language}
    style={a11yDark}
    showLineNumbers
    customStyle={{ fontSize: styles.fontSize.medium }}
  >
    {code.text}
  </SyntaxHighlighter>
);
