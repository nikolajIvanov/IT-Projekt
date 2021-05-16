class Nutzer {
    constructor() {
        this.name = "";
        this.email = "";
        this.UID = "";
        this.gender = "";
        this.date = "";
        this.bio = "";
        this.lerntyp = "";
        this.lernspeed = "";
        this.modul = "";
    }

    //Getter der Google ID
    getUID(){
        return this.UID
    }

    //Getter-Setter #name
    getName(){
        return this.name
    }
    setName(name){
        this.name = name
    }

    //Getter-Setter #email
    getMail(){
        return this.email
    }
    setMail(mail){
        this.email = mail
    }

    //Getter-Setter alle #Profildaten
    getProfil(){
        return {
            name: this.name,
            gender: this.gender,
            date: this.date,
            bio: this.bio,
            lerntyp: this.lerntyp,
            lernspeed: this.lernspeed,
            modul: this.modul
        }
    }
    setProfil(user){
        this.name = user.name;
        this.gender = user.gender;
        this.date = user.date;
        this.bio = user.bio;
        this.lerntyp = user.lerntyp;
        this.lernspeed = user.lernspeed;
        this.modul = user.modul;

    }
}

export default Nutzer;