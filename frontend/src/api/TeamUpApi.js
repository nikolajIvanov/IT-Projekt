import UserBO from "../bo/UserBO";
import LerngruppeBO from "../bo/LerngruppeBO";

// Die komplette API Logik wird über diese Klasse gehandelt und an die jeweiligen Frontend Seiten übergeben.
export default class TeamUpApi {

    static #api = null;

    #serverBaseURL = '';

    // Die URL für einen konkreten User.
    getUserURL = (authId) => `${this.#serverBaseURL}/users/${authId}`;
    // User löschen
    deleteUser = (authId) => `${this.#serverBaseURL}/users/${authId}`;
    // Neuen User Anlegen
    postUser = () => `${this.#serverBaseURL}/users`;

    //Gruppe vom Backend holen
    getGruppeUrl = (gruppenName) => `${this.#serverBaseURL}/Lerngruppe/${gruppenName}`;
    //Gruppe Updaten
    updateGruppeUrl =(gruppenName) => `${this.#serverBaseURL}/LerngruppeBO/${gruppenName}`;
    // Gruppe löschen
    deleteGruppeUrl = (gruppenName) => `${this.#serverBaseURL}/LerngruppeBO/${gruppenName}`;
    // Neue Gruppe anlegen
    postGruppeUrl = (gruppenName) => `${this.#serverBaseURL}/LerngruppeBO/${gruppenName}`;

    // Wird bei jedem API Aufruf als erstes aufgerufen. Es erzeugt ein Objekt der Klasse TeamUpApi um somit die
    // einzelnen Objektmethoden aufrufen zu können.
    static getAPI() {
        if (this.#api == null) {
        this.#api = new TeamUpApi();
        }
        return this.#api;
    }
    // Der API Call findet über diese Methode statt. Je nachdem um welche HTTP Methode es sich handelt, wird ein
    // anderer Body übergeben sowie die URLs für das Backend.
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            //HTTP Error werden nicht zurück gewiesen
            if (!res.ok) {
            throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )
    // Ein einzelner User wird vom Backend ans Frontend übergeben. Die Daten werden in einer Klasse gespeichert.
    getUser(authId) {
        return this.#getSingle(this.getUserURL(authId), UserBO)
    }

    // Dient zum Anlagen eines neuen User. Als Übergabeparameter wird ein befülltes User Objekt erwartet.
    setUser(user){
        return this.#add(this.postUser(), user)
    }

    // Ruft im Backend einen konkreten User auf und updatet die Werte, die im Übergabeparameter vorhanden sind.
    updateUser(authId, user){
        return this.#update(this.getUserURL(authId), user);
    }

    getGruppe(name){
        return this.#getSingle(this.getGruppeUrl(name), LerngruppeBO);

    }

    setGruppe(lerngruppe){
        return this.#add(this.postGruppeUrl(), lerngruppe);
    }

    updateGruppe(name, lerngruppe){
        return this.#update(this.updateGruppeUrl(name),lerngruppe)
    }
    //TODO Delete Gruppe einfügen

    // Generische Methode um einen einzelnen Wert vom Backend ans Frontend zu übergeben.
    #getSingle = (url, BO) => {
        return this.#fetchAdvanced(url).then( responseJSON => {
            let responseBO = BO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseBO);
            })
        })
    }
    // Generische Methode um ein neues Objekt im Backend anzulegen (POST Methode).
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

    // Generische Methode um ein vorhandenes Objekt im Backend zu updaten (PUT Methode).
    #update = (url, businessObject)=>{
        return this.#fetchAdvanced(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(businessObject)
            }).then(r => console.log(r))
    }
}