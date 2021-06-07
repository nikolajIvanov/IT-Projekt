import BusinessObject from "./BusinessObject";

export default class ModulBO extends BusinessObject {
    constructor() {
        super();
        this.modul = null
    }
    getModul(){
        return this.modul;
    }
    setModul(newModul){
        this.modul = newModul;
    }

    static fromJSON(modul) {
        let result = [];
        if (Array.isArray(modul)) {
            modul.forEach((u) => {
                Object.setPrototypeOf(u, ModulBO.prototype);
                result.push(u);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let u = modul;
            Object.setPrototypeOf(u, ModulBO.prototype); //automatisches Konvertieren des JSON-Inhalts in ein UserBO Objekt
            result.push(u);
        }

        return result;
    }
};