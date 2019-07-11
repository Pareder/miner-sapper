import Vue from 'vue'

class API {
  constructor (http) {
    this._http = http
  }

  static createFrom () {
    return new API(Vue.http)
  }

  async getLeaderboard ({ name, result, mode }) {
    const data = await this._http.post('/result', { name, result, mode })

    return data.body
  }
}

export default API
