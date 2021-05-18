import BusinessObject from "./BusinessObject";

export default class User extends BusinessObject {
    constructor() {
        super();
        this.profilBild = null;
        this.name = "";
        this.lerntyp = "";
        this.modul = [];
        this.beschreibung = "";
        this.gender = "";
        this.geburtsdatum = null;
        this.email = "";
        this.istinGruppe = [];
        this.authId = "";
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
        return this.geburtsdatum;
    }

    setGeburtstag(newGeburtstag) {
        this.geburtsdatum = newGeburtstag;
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

    setGruppen(gruppe) {
       this.istinGruppe.add(gruppe);
    }

    getAuthId(){
        return this.authId;
    }

    setAuthId(newAuthId) {
        this.authId = newAuthId;
    }

    //Getter-Setter alle #Profildaten
    getAll(){
        return {
            name: this.name,
            gender: this.gender,
            geburtsdatum: this.geburtsdatum,
            beschreibung: this.beschreibung,
            lerntyp: this.lerntyp,
            modul: this.modul,
            profilBild: this.profilBild,
            //istinGruppe: this.istinGruppe,
            authId: this.authId,
            email: this.email
        }
    }
    setAll(user){
        this.name = user.name;
        this.gender = user.gender;
        this.geburtsdatum = user.geburtsdatum;
        this.beschreibung = user.beschreibung;
        this.lerntyp = user.lerntyp;
        this.modul.push(user.modul);
        this.profilBild = user.profilBild;
        this.istinGruppe = user.istinGruppe;
        this.authId = user.authId;
        this.email = user.email;
    }
}
