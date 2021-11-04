import Head from "next/head";
import React from "react";

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

const Layout = ({ title = "", children }: LayoutProps) => {
  return (
    <div className="flex flex-col relative min-w-full min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/raindrop-fx@1.0.8/bundle/index.js" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
