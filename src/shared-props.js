import PropTypes from 'prop-types'

export const Viewable = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.objectOf(PropTypes.bool),
])
