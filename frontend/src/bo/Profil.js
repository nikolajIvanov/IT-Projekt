import BusinessObject from "./BusinessObject";

export default class Profil extends BusinessObject {
    constructor() {
        super();
        this.profilBild = null;
        this.name = "";
        this.lerntyp = "";
        this.modul = [];
        this.beschreibung = "";
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


    //Getter-Setter alle #Profildaten
    getAll(){
        return {
            name: this.name,
            beschreibung: this.beschreibung,
            lerntyp: this.lerntyp,
            modul: this.modul,
            profilBild: this.profilBild,

        }
    }
    setAll(gruppe){
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
