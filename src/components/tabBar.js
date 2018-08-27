import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabBar extends Component {
  state = {
    selected: 0
  }

  change = (index) => 
    (e) => this.setState((prec) => ({ ...prec, selected: index }))

  render() {
    let { selected } = this.state
    let { components } = this.props
    return (
      <div className="container" >
        <div className="tabs is-centered is-fullwidth">
          <ul>
            { components.map(({ label }, index) => 
              <li key={index} className={selected === index ? 'is-active' : ''}>
                <a onClick={this.change(index)} >{label}</a>
              </li>)}
          </ul>
        </div>
        <div className="container is-fullwidth" >
          { components[selected].component }
        </div>
      </div>
    );
  }
}

TabBar.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    component: PropTypes.object
  })).isRequired
}

export default TabBar;
