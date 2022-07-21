import $api from "../https";


export default class UserService {
  static async fetchUsers() {
    return $api.get('/users')
  }

  static async fetchCompanyUsers(founderEmail) {
    return $api.post('/companyusers', {founderEmail})
  }
}