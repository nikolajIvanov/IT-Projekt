import BusinessObject from "./BusinessObject";

export default class LerntypBO extends BusinessObject {
    constructor() {
        super();
        this.bild = null
        this.lerntyp = null
    }
    getBild(){
        return this.bild;
    }

    setBild(newBild){
        this.bild = newBild;
    }

    getLerntyp() {
        return this.lerntyp;
    }

    setLerntyp(newLerntyp){
        this.lerntyp = newLerntyp;
    }

    static fromJSON(lerntyp) {
        let result = [];
        if (Array.isArray(lerntyp)) {
            lerntyp.forEach((u) => {
                Object.setPrototypeOf(u, LerntypBO.prototype);
                result.push(u);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let u = lerntyp;
            Object.setPrototypeOf(u, LerntypBO.prototype); //automatisches Konvertieren des JSON-Inhalts in ein UserBO Objekt
            result.push(u);
        }

        return result;
    }
};
