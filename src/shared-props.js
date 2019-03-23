import PropTypes from 'prop-types'

export const Viewable = PropTypes.oneOf(
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.objectOf(PropTypes.boo)
)
