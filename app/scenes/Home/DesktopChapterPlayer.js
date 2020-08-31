import React from "react";

import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';

import dispatcher from "../../dispatcher";
import GlobalStore from "../../store/GlobalStore";

const Styles = {
    playButton: {
        background: "#e4e0d9",
        transition: "all 0.25s",
        "&:hover": {
            background: "black",
        },
    },
    playButtonContainer: {
        background: "url('/img/play-icon-beige.svg') center / cover",
        // transition: "background-image 0.25s",
        "&:hover": {
            background: "url('/img/play-icon-black.svg') center / cover",
        },
    },
};


class DesktopChapterPlayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            time: "00:00",
        };

        this.audio = new Audio(props.audio);
        this.id = Math.round(Math.random() * 10000);

        this.handlePauseAll = this.handlePauseAll.bind(this);
    }

    toggleAudio() {
        if (this.state.playing)
            this.pauseAudio()
        else
            this.playAudio()
    }

    playAudio() {
        this.setState({
            playing: true
        });
        this.audio.play();

        dispatcher.dispatch({
            type: "PLAY",
            id: this.id,
        });
    }

    pauseAudio(reset) {
        this.audio.pause();
        this.setState({
            playing: false
        });

        if (reset) {
            this.audio.currentTime = 0;
        }
    }

    setListeners() {
        this.audio.addEventListener('ended',() => {
            this.pauseAudio();
        });

        this.audio.ontimeupdate = () => {
            console.log(this.audio.currentTime);
            this.updateProgress();
        };
    }

    handlePauseAll(e) {
        if (e.id !== this.id)
            this.pauseAudio(true);
    }

    componentDidMount() {
        this.setListeners();
        GlobalStore.on("pause-all", this.handlePauseAll)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps.audio, this.props.audio);
        if (prevProps.audio !== this.props.audio) {
            this.pauseAudio();
            this.audio = new Audio(this.props.audio);
            this.setListeners();
            this.setState({
                progress: 0
            })
        }
    }

    componentWillUnmount() {
        this.pauseAudio();
        GlobalStore.removeListener("pause-all", this.handlePauseAll);
    }

    updateProgress() {
        this.setState({
            progress: this.audio.currentTime / this.audio.duration,
            time: this.calculateTotalValue(this.audio.currentTime)
        });
    }

    setProgress(p) {
        this.audio.currentTime = this.audio.duration * p;
        this.updateProgress();
    }

    calculateTotalValue(length) {

        var sec_num = parseInt(length, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (minutes < 10) {minutes = "0" + minutes;}
        if (seconds < 10) {seconds = "0" + seconds;}

        return minutes + ':' + seconds;
    }

    render() {
        let { classes, src } = this.props;

        const { progress, time } = this.state;
        const end = this.calculateTotalValue(this.audio.duration || 0);

        return (<div id={"audio" + this.id} >
            <div style={{display: "flex"}}>
                <div style={{flex: 1}}>
                    <div style={{width: "100%", maxWidth: "316px"}}>
                        <div style={{display: "flex", fontFamily: "UntitledSans-Regular", lineHeight: "36px", fontSize: "11px"}}>
                            <div style={{flex: "0 0 15px"}}>{time}</div>
                            <div style={{flex: 1, margin: "0 8px", position: "relative"}}>
                                <div style={{height: "3px", position: "absolute", top: "calc(50% - 1.5px)", width: "100%", background: "#84827b50", borderRadius: "5px"}}>
                                    <input onChange={(e) => {
                                        console.log("CHANGE", e.target.value)
                                        this.setProgress(e.target.value)
                                    }} type={"range"} value={progress} min={0} max={1} step={0.0001}/>
                                </div>
                            </div>
                            <div style={{flex: "0 0 15px"}}>{end}</div>
                        </div>
                    </div>
                </div>
                <div style={{flex: "0 0 50px"}}>
                    <div onClick={() => {this.toggleAudio()}} className={classes.playButton} style={{ display: "inline-block", background: this.state.playing ? "url('/img/chapter-gradient.png')" : null, cursor:"pointer", height: "36px", lineHeight: "36px", textAlign: "center", width: "36px", borderRadius: "100%",
                        animation: "backgroundmove 10s infinite",
                        backgroundPosition: "left",
                        animationTimingFunction: "ease-in-out"
                    }}>
                        <div className={classes.playButtonContainer} style={{display: "inline-block", height: "100%", width: "100%", background: this.state.playing ? "url('/img/pause-icon.svg') center 11px / 10px no-repeat" : null, }}>

                        </div>
                    </div>
                </div>

            </div>

        </div>)
    }

}

export default withRouter(injectSheet(Styles)(DesktopChapterPlayer))
