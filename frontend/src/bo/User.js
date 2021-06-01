import Profil from "./Profil";

export default class UserBO extends Profil {
    constructor() {
        super();
        this.gender = "";
        this.geburtsdatum = null;
        this.email = "";
        this.istinGruppe = [];
        this.authId = "";
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

    static fromJSON(user) {
        let result = [];
        if (Array.isArray(user)) {
          user.forEach((u) => {
            Object.setPrototypeOf(u, UserBO.prototype);
            result.push(u);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let u = user;
          Object.setPrototypeOf(u, UserBO.prototype); //automatisches Konvertieren des JSON-Inhalts in ein UserBO Objekt
          result.push(u);
        }

        return result;
      }
}
