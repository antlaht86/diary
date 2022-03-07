import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import ThemeConfig from "./themes";
import Layout from "./components/layout";

export const meta: MetaFunction = () => {
  return { title: "Life log" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="icon" type="image/png" sizes="16x1" />
        <Meta />
        <Links />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <ThemeConfig>
          <Layout>
            <Outlet />
          </Layout>
        </ThemeConfig>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
