import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'searchItem',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SearchItemContainer = require('./containers/SearchItemContainer').default

      const reducerSearchItem = require('./modules/searchItem').default
      const reducerGps = require('../../modules/gps').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'searchItem', reducer: reducerSearchItem })
      injectReducer(store, { key: 'gps', reducer: reducerGps })

      /*  Return getComponent   */
      cb(null, SearchItemContainer)

      /* Webpack named bundle   */
    }, 'searchItem')
  }
})
