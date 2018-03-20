// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import CounterRoute from './Counter';
import SearchItem from './SearchItem';
import MediaStreamNew from './MediaStreamNew';
import ItemDetail from './ItemDetail';
import Locator from './Locator';
import PlaceLocator from './PlaceLocator';
import SendItem from './SendItem';
import Chat from './Chat';
import Test from './Test';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    CounterRoute(store),
    SearchItem(store),
    MediaStreamNew(store),
    ItemDetail(store),
    Locator(store),
    PlaceLocator(store),
    SendItem(store),
    Chat(store),
    Test(store)
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
