import Profil from "./Profil";

export default class LerngruppeBO extends Profil {
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
        this.beschreibung = lerngruppe.beschreibung;
        this.lerntyp = lerngruppe.lerntyp;
        this.modul.push(lerngruppe.modul);
        this.profilBild = lerngruppe.profilBild;
        this.mitglieder.push(lerngruppe.mitglieder);
        this.admin.push(lerngruppe.admin);

    }
    static fromJSON(user) {
        let result = [];
        if (Array.isArray(user)) {
          user.forEach((u) => {
            Object.setPrototypeOf(u, LerngruppeBO.prototype);
            result.push(u);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let u = user;
          Object.setPrototypeOf(u, LerngruppeBO.prototype); //automatisches Konvertieren des JSON-Inhalts in ein UserBO Objekt
          result.push(u);
        }

        return result;
      }
};