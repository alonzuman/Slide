import Users from './Users'
import Me from './Me'
import Invites from './Invites'
import Feedback from './Feedback'
import Activity from './Activity'
import Admin from './Admin'
import Activities from './Activities'
import Explore from './Explore'
import Streams from './Streams'
import Events from './Events'
import Notifications from './Notifications'
import axios from 'axios'
import auth from '@react-native-firebase/auth'

export const REST_URL = 'https://polar-brook-84972.herokuapp.com/api/v1'
export const SOCKET_URL = 'https://polar-brook-84972.herokuapp.com'

// export const REST_URL = 'http://localhost:5000/api/v1'
// export const SOCKET_URL = 'http://localhost:5000'

export const Request = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object | null
) => {
  const user = auth().currentUser
  const token = user && await user.getIdToken()

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const res = await axios({
      baseURL: REST_URL,
      url,
      method,
      headers,
      data
    })

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default {
  Users,
  Invites,
  Feedback,
  Me,
  Activity,
  Activities,
  Admin,
  Explore,
  Streams,
  Events,
  Notifications
}
