import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Meeting Assistant</title>
        <meta name="description" content="AI-powered meeting summaries and followups" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}