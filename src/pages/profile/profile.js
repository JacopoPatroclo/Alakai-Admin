import React, { Component } from 'react'
import TabBar from '../../components/tabBar';
import PropTypes from 'prop-types';

import { getData, updateData, createOne } from '../../api/user'

import UpdateUserForm from '../../components/Forms/updateUserForm'
import CreateUserForm from '../../components/Forms/createUserForm'

class ProfilePage extends Component {

  state = {
    userData: {},
    error: {},
    loading: false
  }

  componentDidMount = () => {
    if (this.props.isLoggedIn && !this.state.userData.id) {
      getData(this.props.isLoggedIn)
        .then(userData => this.setState({ userData }))
        .catch(error => this.setState({ userData: {}, error }))
    }
  };
  

  componentDidUpdate() {
    if (this.props.isLoggedIn && !this.state.userData.id) {
      getData(this.props.isLoggedIn)
        .then(userData => this.setState({ userData }))
        .catch(error => this.setState({ userData: {}, error }))
    }
  }

  updateUser = ({ email, password }) => {
    this.setState(prec => ({
      ...prec,
      loading: true
    }))
    const data = {
      email
    }
    if (password && password.trim() !== '') {
      data.password = password
    }
    updateData(this.props.isLoggedIn)(data)
      .then(() => this.setState(prec => ({
        ...prec,
        loading: false,
        userData: {
          ...prec.userData,
          email
        }
      })))
      .catch(error => this.setState(prec => ({
        ...prec,
        loading: false,
        error
      })))
  }

  createUser = ({ email, password }) => {
    this.setState(prec => ({
      ...prec,
      loading: true
    }))
    createOne(this.props.isLoggedIn)({
      email,
      password
    })
      .then(() => this.setState(prec => ({
        ...prec,
        loading: false
      })))
      .catch(error => this.setState(prec => ({
        ...prec,
        loading: false,
        error
      })))
  }

  render() {
    let { userData, error, loading } = this.state

    return (
      <div className="container">
        <TabBar components={[
          { label: 'Personal Profile', component: <UpdateUserForm user={userData} onsubmit={this.updateUser} loading={loading} error={error} />},
          { label: 'User Creation', component: <CreateUserForm onsubmit={this.createUser} loading={loading} error={error} />}
        ]} />
      </div>
    )
  }

}

ProfilePage.propTypes = {
  isLoggedIn: PropTypes.string
}

export default ProfilePage