import $api from "../https";


export default class UserService {
  static fetchUsers() {
    return $api.get('/users')
  }
}