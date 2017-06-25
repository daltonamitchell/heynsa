import Head from 'next/head';

const Layout = ({ children, title = 'Default page title' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
      </Head>

      {children}

      <footer />

      <style>{`
        div {
          text-align: center;
        }

        ul {
          list-style-type: none;
        }
      `}</style>
    </div>
  );
};

export default Layout;
