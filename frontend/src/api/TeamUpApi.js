import User from "../bo/User";
const user = new User();

export default class TeamUpApi {

    static #api = null;

    #serverBaseURL = '/api';

    // User vom Backend holen
    getUser = (authId) => `${this.#serverBaseURL}/users/${authId}`;
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
        return
    }

    setUser(user){
        this.#fetchAdvanced(this.postUser(), user).then(r =>
        console.log(r))
    }
}