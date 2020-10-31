export default class ClienteAPI {
    constructor(url) {
        this.url = url
    }

    async getItems() {
        var resp = await fetch(this.url)
        if (resp.ok) {
            return resp.json()
        }
        else {
            throw new Error(resp.status)
        }

    }

    async toggleItem(id, valor_bool) {
        var resp = await fetch(this.url + '/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comprado: valor_bool })
        })
        if (resp.ok) {
            return true
        }
        else {
            throw new Error(resp.status)
        }
    }

    async deleteItem(id) {
        var resp = await fetch(this.url + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (resp.ok) return true
        else throw new Error(resp.status)

    }

    async addItem(name) {
        var resp = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: name })
        })

        if (resp.ok) return true;
        else throw new Error(resp.status)

    }
}
