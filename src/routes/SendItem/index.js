import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'sendItem',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SendItem = require('./containers/SendItemContainer').default
      const reducer = require('./modules/sendItem').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'sendItem', reducer })

      /*  Return getComponent   */
      cb(null, SendItem)

    /* Webpack named bundle   */
  }, 'sendItem')
  }
})
