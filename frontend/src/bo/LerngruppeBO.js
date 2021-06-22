import ProfilBO from "./ProfilBO";

export default class LerngruppeBO extends ProfilBO {
     constructor() {
        super();
        this.mitglieder = [];
        this.admin = null;

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
            id: this.id,
            name: this.name,
            beschreibung: this.beschreibung,
            lerntyp: this.lerntyp,
            modul: this.modul,
            profilBild: this.profilBild,
            mitglieder: this.mitglieder,
            admin: this.admin,
            frequenz: this.frequenz,
            lernort: this.lernort
        }
    }
    setAll(lerngruppe){
        this.name = lerngruppe.name;
        this.beschreibung = lerngruppe.beschreibung;
        this.lerntyp = lerngruppe.lerntyp;
        this.modul = lerngruppe.modul;
        this.profilBild = lerngruppe.profilBild;
        this.mitglieder = lerngruppe.mitglieder;
        this.admin = lerngruppe.admin;
        this.frequenz = lerngruppe.frequenz;
        this.lernort = lerngruppe.lernort

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