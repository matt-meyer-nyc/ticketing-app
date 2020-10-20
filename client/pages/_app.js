// b/c using Nex.JS, this wrapper Component file is needed
// in order to pass CSS functinoality into subsequent pages
// this is a global css file that needs to load for every page of application

import 'bootstrap/dist/css/bootstrap.css';

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
