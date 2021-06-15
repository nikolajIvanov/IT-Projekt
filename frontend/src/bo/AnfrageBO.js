export default class AnfrageBO {
    constructor() {
        this.requestId = null;
        this.userAuthId = null;
        this.partnerId = null;
    }

    setRequestId(requestId){
        this.requestId = requestId;
    }

    setAuthId(authId){
        this.userAuthId = authId;
    }

    setPartnerId(partnerId) {
        this.partnerId = partnerId;
    }

    getAll(){
        return {
            requestId: this.requestId,
            userAuthId: this.userAuthId,
            partnerId: this.partnerId,
        }
    }
};