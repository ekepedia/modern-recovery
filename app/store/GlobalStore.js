import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";

class GlobalStore extends EventEmitter {

    constructor() {
        super();

        this.setMaxListeners(30);
    }

    handleActions(action) {
        switch(action.type) {
            case "PLAY": {
                this.emit("pause-all", {id: action.id});
                break;
            }
        }
    }

}

const dataStore = new GlobalStore;
dispatcher.register(dataStore.handleActions.bind(dataStore));

export default dataStore;