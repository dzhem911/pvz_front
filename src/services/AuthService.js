import $api from "../https";

export default class AuthService {

  static async login(email, password) {
    return $api.post('/login', {email, password})
  }

  static async registration(firstName, lastName, phoneNumber, email, companyName, password, role) {
    return $api.post('/registration', {firstName, lastName, phoneNumber, email, companyName, password, role})
  }

  static async logout() {
    return $api.post('/logout')
  }
}