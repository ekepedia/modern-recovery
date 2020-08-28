import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";

class GlobalStore extends EventEmitter {

    constructor() {
        super();
    }

    handleActions(action) {
        switch(action.type) {
            case "RECEIVE_PUZZLES": {
                this.puzzles = action.puzzles;
                this.emit("change");
                break;
            }
        }
    }

}

const dataStore = new GlobalStore;
dispatcher.register(dataStore.handleActions.bind(dataStore));

export default dataStore;