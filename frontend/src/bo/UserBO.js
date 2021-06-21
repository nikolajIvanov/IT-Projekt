import ProfilBO from "./ProfilBO";


// Business User Klasse in der alle Werte für einen konkreten User gespeichert und verarbeitet werden.
export default class UserBO extends ProfilBO {
    constructor() {
        super();
        this.gender = "";
        this.geburtsdatum = null;
        this.vorname = "";
        this.email = "";
        this.istinGruppe = [];
        this.authId = "";
        this.semester = null;
        this.studiengang = null;
    }

    getGeburtstag() {
        return this.geburtsdatum;
    }

    setGeburtstag(newGeburtstag) {
        this.geburtsdatum = newGeburtstag;
    }

    getVorname(){
        return this.vorname
    }

    setVorname(newVorname){
        this.vorname = newVorname
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

    getSemester(){
        return this.semester
    }

    setSemester(newSemester){
        this.semester = newSemester
    }

    getStudiengang(){
        return this.studiengang
    }

    setStudiengang(newStudiengang){
        this.studiengang = newStudiengang
    }

    //Getter-Setter alle #Profildaten
    getAll(){
        return {
            id: this.id,
            name: this.name,
            vorname: this.vorname,
            gender: this.gender,
            geburtsdatum: this.geburtsdatum,
            beschreibung: this.beschreibung,
            lerntyp: this.lerntyp,
            modul: this.modul,
            profilBild: this.profilBild,
            authId: this.authId,
            email: this.email,
            semester: this.semester,
            studiengang: this.studiengang,
            frequenz: this.frequenz,
            lernort: this.lernort
        }
    }
    setAll(user){
        this.id = user.id;
        this.name = user.name;
        this.vorname = user.vorname;
        this.gender = user.gender;
        this.geburtsdatum = user.geburtsdatum;
        this.beschreibung = user.beschreibung;
        this.lerntyp = user.lerntyp;
        this.modul = user.modul;
        this.frequenz = user.frequenz;
        this.lernort = user.lernort;
        this.profilBild = user.profilBild;
        this.istinGruppe = user.istinGruppe;
        this.authId = user.authId;
        this.email = user.email;
        this.semester = user.semester;
        this.studiengang = user.studiengang
    }

    // Wird beim Aufruf einer PUT und POST Methode vom Backend aufgerufen und speichert die einzelnen Werte der
    // JSON in ein Klassenobjekt UserBO.
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
