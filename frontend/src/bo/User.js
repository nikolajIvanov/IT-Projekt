import BusinessObject from "./BusinessObject";

export default class User extends BusinessObject {
    constructor() {
        super();
        this.bild = ""; // TODO: Format muss geändert werden -> BLOB
        this.name = "";
        this.lerntyp = "";
        this.modul = "";
        this.beschreibung = "";
        this.geburtstag = ""; // TODO: Format muss geändert werden -> DATE
        this.email = "";
        this.istinGruppe = ""; // TODO: Format muss geändert werden -> ARRAY
        this.uid = "";
    }

    getName(){
        return this.name;
    }

    setName(newname) {
        this.name = newname;
    }

    getLerntyp() {
        return this.lerntyp;
    }

    setLerntyp(newLerntyp) {
        this.lerntyp = newLerntyp;
    }

    getModul() {
        return this.modul;
    }

    setModul(newModul) {
        this.modul = newModul;
    }

    getBeschreibung() {
        return this.beschreibung ;
    }

    setBeschreibung(newBeschreibung) {
        this.beschreibung = newBeschreibung;
    }

    getGeburtstag() {
        return this.geburtstag;
    }

    setGeburtstag(newGeburtstag) {
        this.geburtstag = newGeburtstag;
    }

    getEmail() {
        return this.email;
    }

    setEmail(newEmail) {
        this.email = newEmail;
    }

    getGruppen() {
        return this.istinGruppe;
    }

    setGruppen() {
        // TODO: Wie übergebe ich ein Array?
    }

    getUID(){
        return this.uid;
    }

    setUID(newUID) {
        this.uid = newUID;
    }
}
