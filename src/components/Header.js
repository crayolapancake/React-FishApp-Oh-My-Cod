import React from 'react';
import PropTypes from 'prop-types';

//  stateless functionaal component as it only has a render menthod and proptypes.
// implicit return without {} and return.
// props can be destructured as ({ tagline, etc})  instead of (props

const Header = (props) => (
    <header className= "top">
      <h1>
        Catch
        <span className= "ofThe">
          <span className="of">Of</span>
          <span className="the">The</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
        {/* "this" is component instance (Header parent in App) */}
      </h3>
    </header>
  )

  {/* if a class component, props need this keyword.
  <span>{this.props.tagline}</span>
  "this" is component instance (Header parent in App) */}

Header.propTypes = {
  tagline: PropTypes.string.isRequired
}
export default Header;
