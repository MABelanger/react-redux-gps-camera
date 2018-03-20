import { connect } from 'react-redux'
import { saveForm } from '../modules/itemDetail'

const ItemDetail = require('../components/ItemDetail').default;

const mapDispatchToProps = {
  saveForm
}

const mapStateToProps = (state) => {
  return {
    itemDetail : state.itemDetail
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)
