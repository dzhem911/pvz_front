import $api from "../https";


export default class CompanyService {
  static async createPVZ(name, staff, address, typePVZ) {
    return $api.post('/createpvz', {name, staff, address, typePVZ})
  }

  static async getPVZs(founderEmail) {
    return $api.post('/getpvzs', {founderEmail})
  }

  static async deletePVZ(founderEmail) {
    return $api.post('/deletepvz', {founderEmail})
  }
}