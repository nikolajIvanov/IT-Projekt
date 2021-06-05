import BusinessObject from "./BusinessObject";

export default class StudiengangBO extends BusinessObject {
    constructor() {
        super();
        this.studiengang = null
    }
    getStudiengang(){
        return this.studiengang;
    }
    setStudiengang(newStudiengang){
        this.studiengang = newStudiengang;
    }

    static fromJSON(studiengang) {
        let result = [];
        if (Array.isArray(studiengang)) {
            studiengang.forEach((u) => {
                Object.setPrototypeOf(u, StudiengangBO.prototype);
                result.push(u);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let u = studiengang;
            Object.setPrototypeOf(u, StudiengangBO.prototype); //automatisches Konvertieren des JSON-Inhalts in ein UserBO Objekt
            result.push(u);
        }

        return result;
    }
};