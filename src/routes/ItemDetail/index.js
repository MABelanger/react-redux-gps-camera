import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'itemDetail',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ItemDetail = require('./containers/ItemDetailContainer').default
      const reducer = require('./modules/itemDetail').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'itemDetail', reducer })

      /*  Return getComponent   */
      cb(null, ItemDetail)

    /* Webpack named bundle   */
  }, 'itemDetail')
  }
})
