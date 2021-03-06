import BusinessObject from "./BusinessObject";

export default class ProfilBO extends BusinessObject {
    constructor() {
        super();
        this.profilBild = null;
        this.name = "";
        this.lerntyp = "";
        this.modul = [];
        this.beschreibung = "";
        this.frequenz = "";
        this.lernort = "";
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

    getFrequenz() {
        return this.frequenz;
    }

    setFrequenz(newFrequenz) {
        this.modul = newFrequenz;
    }

    getLernort() {
        return this.beschreibung ;
    }

    setLernort(newOrt) {
        this.beschreibung = newOrt;
    }
}
