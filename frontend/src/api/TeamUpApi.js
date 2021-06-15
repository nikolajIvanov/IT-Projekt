import LerngruppeBO from "../bo/LerngruppeBO";
import UserBO from "../bo/UserBO";
import StudiengangBO from "../bo/StudiengangBO";
import ModulBO from "../bo/ModulBO";

// Die komplette API Logik wird über diese Klasse gehandelt und an die jeweiligen Frontend Seiten übergeben.
export default class TeamUpApi {

    static #api = null;

    #serverBaseURL = '';

    // Die URL für einen konkreten User.
    #userURL = (authId) => `${this.#serverBaseURL}/users/${authId}`;
    // Die URL für alle User.
    #allUsersURL = () => `${this.#serverBaseURL}/users`;

    // Die URL für eine Konkrete Lerngruppe
    #gruppeURL = (gruppenId) => `${this.#serverBaseURL}/lerngruppe/${gruppenId}`;
    // Neue Gruppe anlegen
    #allGruppenURL = () => `${this.#serverBaseURL}/lerngruppen`;

    //Studiengang URL
    #studiengangURL = () => `${this.#serverBaseURL}/studiengang`;

    //Module URL
    #modulURL = (studiengang) => `${this.#serverBaseURL}/modul/${studiengang}`;

    // Lerntyp URL
    #lerntypURL = () => `${this.#serverBaseURL}/lerntyp`;

    // Endpunkt um den User einzuloggen oder in die Registrierung zu schicken
    // sowie den Matching Algorithmus zu initiieren
    #initURL = (authId) => `${this.#serverBaseURL}/init/${authId}`;

    #usersMatchURL = (authId) => `${this.#serverBaseURL}/usermatch/${authId}`;

    #groupMatchURL = (authId) => `${this.#serverBaseURL}/lerngruppenmatch/${authId}`;

    #getMatchUsersURL = (userArray) => `${this.#serverBaseURL}/usersById${userArray}`;

    #getMatchGroupsURL = (groupArray) => `${this.#serverBaseURL}/lerngruppenById${groupArray}`;

    #getChatContentURL = (roomId) => `${this.#serverBaseURL}/chat/${roomId}`;

    #getRoomsURL = (authId) => `${this.#serverBaseURL}/chatrooms/${authId}`;

    #chatRequestURL = () => `${this.#serverBaseURL}/request`;

    #acceptUserRequestURL = () => `${this.#serverBaseURL}/accept_request`

    #getChatRequestsURL = (authId) => `${this.#serverBaseURL}/request/${authId}`;

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

    #fetchMatching = (url, init) => fetch(url, init)
        .then(res => {
            return res.json()
        })

    // Ein einzelner User wird vom Backend ans Frontend übergeben. Die Daten werden in einer Klasse gespeichert.
    getUser(authId) {
        return this.#getSingle(this.#userURL(authId), UserBO)
    }

    getAllUsers(){
        return this.#getAll(this.#allUsersURL(), UserBO);
    }

    // Dient zum Anlagen eines neuen User. Als Übergabeparameter wird ein befülltes User Objekt erwartet.
    setUser(user){
        return this.#add(this.#allUsersURL(), user)
    }

    // Ruft im Backend einen konkreten User auf und updatet die Werte, die im Übergabeparameter vorhanden sind.
    updateUser(authId, user){
        return this.#update(this.#userURL(authId), user, UserBO);
    }

    deleteUser(authId){
        return this.#delete(this.#userURL(authId));
    }

    setGruppe(lerngruppe){
        return this.#add(this.#allGruppenURL(), lerngruppe);
    }

    updateGruppe(gruppenId, lerngruppe){
        return this.#update(this.#gruppeURL(gruppenId),lerngruppe)
    }

    getStudiengang(){
        return this.#getAll(this.#studiengangURL(), StudiengangBO)
    }

    getLerntyp(){
        return this.#getAll(this.#lerntypURL(), LerngruppeBO)
    }

    getModul(studiengang){
        return this.#getAll(this.#modulURL(studiengang), ModulBO)
    }

    getInit(user){
        return this.#getStatus(this.#initURL(user))
    }

    getMatchUserList(authId){
        return this.#getMatchResponse(this.#usersMatchURL(authId))
    }

    getMatchGroupList(authId){
        return this.#getStatus(this.#groupMatchURL(authId))
    }

    getUsersByMatch(userArray){
        let array = userArray.join();
        return this.#matching(this.#getMatchUsersURL("?user_ids=" + array), UserBO)
    }

    getGroupByMatch(groupArray){
        let array = groupArray.join();
        return this.#matching(this.#getMatchGroupsURL("?group_ids=" + array), UserBO)
    }

    getChatContent(roomId){
        return this.#getStatus(this.#getChatContentURL(roomId))
    }

    sendChatRequest(userdict){
        return this.#addChatRequest(this.#chatRequestURL(), userdict)
    }

    getChatRequests(authId){
        return this.#getStatus(this.#getChatRequestsURL(authId))
    }

    getChatrooms(authId){
        return this.#getStatus(this.#getRoomsURL(authId))
    }

    acceptUserRequest(anfrage){
        return this.#add(this.#acceptUserRequestURL(), anfrage)
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

    #getStatus = (url) => {
        return this.#fetchAdvanced(url).then( statusCode => {
            return statusCode
        })
    }

    #getMatchResponse = (url) => {
        return this.#fetchMatching(url).then( response => {
            return response
        })
    }

    #addChatRequest = (url, userdict) =>{
        return this.#fetchAdvanced(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userdict)
        }).then(
            (res) => {
                return res
            }
        )
    }

    #getAll = (url, BO) => {
        return this.#fetchAdvanced(url).then((responseJSON) => {
            let responseBOs = BO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseBOs);
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
    #update = (url, businessObject, BO)=>{
        return this.#fetchAdvanced(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(businessObject)
            }).then( responseJSON => {
            let responseBO = BO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseBO);
            })
        })
    }

    // Generische Methode um ein vorhandenes Objekt im Backend zu löschen (DELETE Methode).
    // Vom Backend wir ein Statuscode übermittelt um zu überprüfen ob das Löschen geklappt hat.
    #delete = (url) => {
        return this.#fetchAdvanced(url, {
            method: 'DELETE',
            redirect: 'follow'
        }).then((responseStatusCode) => {
            return(responseStatusCode)
        })
    }

    #matching = (url, BO) => {
        return this.#fetchAdvanced(url, {
            method: 'GET',
        }).then((responseJSON) => {
            let responseBOs = BO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseBOs);
            })
        })
    }
}
