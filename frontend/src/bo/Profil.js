import BusinessObject from "./BusinessObject";

export default class Profil extends BusinessObject {
    constructor() {
        super();
        this.profilBild = null;
        this.name = "";
        this.lerntyp = "";
        this.modul = [];
        this.beschreibung = "";
        this.semstester = null;
        this.studiengang = null;
    }

    getProfilBild(){
        return this.profilBild;
    }

    setProfilBild(bild){
        this.profilBild = bild;
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

    getSemester(){
        return this.semstester
    }

    setSemester(newSemester){
        this.semstester = newSemester
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
            name: this.name,
            beschreibung: this.beschreibung,
            lerntyp: this.lerntyp,
            modul: this.modul,
            profilBild: this.profilBild,
            semester: this.semstester,
            studiengang: this.studiengang
        }
    }
    setAll(gruppe){
        this.name = gruppe.name;
        this.beschreibung = gruppe.beschreibung;
        this.lerntyp = gruppe.lerntyp;
        this.modul.push(gruppe.modul);
        this.profilBild = gruppe.profilBild;
        this.semstester = gruppe.semester;
        this.studiengang = gruppe.studiengang
    }
}
