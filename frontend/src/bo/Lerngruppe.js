import Profil from "./Profil";

export default class Lerngruppe extends Profil {
     constructor() {
        super();
        this.mitglieder = [];
        this.admin = [];
}
    getMitglieder(){
         return this.mitglieder;
    }
    setMitglieder(neuesMitglied){
         this.mitglieder = neuesMitglied;
    }
    getAdmin(){
         return this.admin;
    }
    setAdmin(neuerAdmin){
         this.admin = neuerAdmin;
    }

        //Getter-Setter alle #Profildaten

    getAll(){
        return {
            name: this.name,
            beschreibung: this.beschreibung,
            lerntyp: this.lerntyp,
            modul: this.modul,
            profilBild: this.profilBild,
            mitglieder: this.mitglieder,
            admin: this.admin
        }
    }
    setAll(lerngruppe){
        this.name = lerngruppe.name;
        this.gender = user.gender;
        this.beschreibung = user.beschreibung;
        this.lerntyp = user.lerntyp;
        this.modul.push(user.modul);
        this.profilBild = user.profilBild;
        this.miglieder.push(lerngruppe.mitglieder);
        this.admin.push(lerngruppe.admin);

    }
    static fromJSON(user) {
        let result = [];
        if (Array.isArray(user)) {
          user.forEach((u) => {
            Object.setPrototypeOf(u, Lerngruppe.prototype);
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
};