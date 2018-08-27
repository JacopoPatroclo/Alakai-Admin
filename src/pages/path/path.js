import React, { Component } from 'react'
import PointVertical from '../../components/pointsVerticalList'
import { getAll } from '../../api/point'


class PathPage extends Component {

  state = {
    points: [],
    selected: [],
    err: null
  }

  componentDidMount() {
    if (!this.props.path_id && this.props.isLoggedIn) {
      getAll(this.props.isLoggedIn)(this.props.lng)
        .then(points => this.setState((prec) => ({
          ...prec,
          points
        })))
        .catch(err => this.setState((prec) => ({
          ...prec,
          err
        })))
    }
  }

  componentDidUpdate() {
    if (!this.props.path_id && this.props.isLoggedIn && this.state.points.length <= 0 && !!!this.state.err) {
      getAll(this.props.isLoggedIn)(this.props.lng)
        .then(points => this.setState((prec) => ({
          ...prec,
          points
        })))
        .catch(err => this.setState((prec) => ({
          ...prec,
          err
        })))
    }
  }

  addOne = (point) => {
    this.setState(prev => ({
      ...prev,
      selected: [
        ...prev.selected,
        {
          ...point,
          index: prev.selected.reduce(acc => acc + 1, 1)
        }
      ]
    }))
  }

  removeOne = (point) => {
    this.setState(prev => ({
      ...prev,
      selected: prev.selected
        .filter(pt => pt.index !== point.index)
        .sort((a, b) => {
          if (a.index > b.index) return 1
          if (a.index < b.index) return -1
          return 0
        })
        .map((pt, index) => ({ 
          ...pt,
          index: index + 1
         }))
    }))
  }

  render() {
    const { points, err, selected } = this.state

    return (
      <div className="container">
        <div className="columns is-3">
          <PointVertical classContainer="column" points={points} selectedOne={this.addOne} />
          <PointVertical classContainer="column" points={selected} selectedOne={this.removeOne}/>
          { err && <p className="is-size-4 is-danger" >{err.message}</p> }
        </div>
      </div>
    )
  }

}

export default PathPage