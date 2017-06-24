import Head from 'next/head';

const Layout = ({ children, title = 'Default page title' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* <script src="https://www.gstatic.com/firebasejs/4.1.3/firebase.js" />
        <script>
          // Initialize Firebase
          firebase.initializeApp(config);
        </script> */}
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
