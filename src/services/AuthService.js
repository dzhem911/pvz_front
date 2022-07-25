import $api from "../https";

export default class AuthService {

  static async refresh(refreshToken) {
    return $api.post('/refresh', {refreshToken})
  }

  static async login(email, password) {
    return $api.post('/login', {email, password})
  }

  static async registration(firstName, lastName, phoneNumber, email, companyName, password, role) {
    return $api.post('/registration', {firstName, lastName, phoneNumber, email, companyName, password, role})
  }

  static async regUser(firstName, lastName, phoneNumber, email, founderEmail) {
    return $api.post('/reguser', {firstName, lastName, phoneNumber, email, founderEmail})
  }

  static async logout() {
    return $api.post('/logout')
  }

  static async refreshPassword(email) {
    return $api.post('/refreshpassword', {email})
  }

  static async deleteUser(email) {
    return $api.post('/deleteuser', {email})
  }
}