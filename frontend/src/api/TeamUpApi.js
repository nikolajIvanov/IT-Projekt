import User from "../bo/User";
const user = new User();

export default class TeamUpApi {

    static #api = null;

    #serverBaseURL = '';

    // User vom Backend holen
    getUserURL = (authId) => `${this.#serverBaseURL}/users/${authId}`;
    // User updaten
    putUser = (authId) => `${this.#serverBaseURL}/users/${authId}`;
    // User löschen
    deleteUser = (authId) => `${this.#serverBaseURL}/users/${authId}`;
    // Neuen User Anlegen
    postUser = () => `${this.#serverBaseURL}/users`;

    static getAPI() {
        if (this.#api == null) {
        this.#api = new TeamUpApi();
        }
        return this.#api;
    }

    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            //HTTP Error werden nicht zurück gewiesen
            if (!res.ok) {
            throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )

    getUser(authId) {
        return this.#getSingle(this.getUserURL(authId))
    }

    setUser(user){
        return this.#add(this.postUser(), user)
    }

    #getSingle = (url) => {
        return this.#fetchAdvanced(url).then( responseJSON => {
            return responseJSON;
            })
    }


    #add = (url, businessObject) =>{
        return this.#fetchAdvanced(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(businessObject)
        }).then(r => console.log(r))
    }
}