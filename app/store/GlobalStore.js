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
            case "PAUSE-ALL": {
                this.emit("pause-all", {id: 9999999999});
                break;
            }
        }
    }

    track(category, action, label, value) {
        console.log("track:", category, action, label, value);
        
        try {
            let obj = {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
            };

            if (value)
                obj.eventValue = value;

            ga('send', obj);
        } catch (e) {
            
        }
    }

}

const dataStore = new GlobalStore;
dispatcher.register(dataStore.handleActions.bind(dataStore));

export default dataStore;