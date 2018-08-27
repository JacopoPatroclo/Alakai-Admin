import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PointsVerticalList extends Component {

  render() {
    const { classContainer, points, selectedOne } = this.props

    return (
      <div
      className={classContainer ? classContainer : 'container'}>
        { points.map((point, index) => (
          <div
          onClick={() => { selectedOne(point) }}
          key={index}
          className="container is-fullhd"
          style={{
            minHeight: 50,
            width: '100%',
            border: '1px solid gray',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            marginTop: 10,
          }}>
            <p className="is-size-6 has-text-grey-dark" >Slug: {point.slug.toUpperCase()}</p>
            { point.index && <p className="is-size-6 has-text-grey-dark" >Order: {point.index}</p> }
          </div>
        )) }
      </div>
    );
  }
}

PointsVerticalList.propTypes = {
  classContainer: PropTypes.string,
  points: PropTypes.array.isRequired,
  selectedOne: PropTypes.func.isRequired
}

export default PointsVerticalList;
