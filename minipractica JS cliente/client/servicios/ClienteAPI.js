export default class ClienteAPI {

    constructor(url) {
        this.url = url
    }

    async getItems() {
        var resp = await fetch(this.url + '/items')
        if (resp.ok) {
            return resp.json()
        } else {
            throw new Error(resp.status)
        }
    }

}