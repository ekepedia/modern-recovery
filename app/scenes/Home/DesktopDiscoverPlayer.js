import React from "react";

import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';

const height = 92*1.5;
const width = 476.04*1.5;

const Styles = {
    container: {
        width: `${height}px`,
        "&:hover": {
            width: `${width}px`,
        },
    },
    playButton: {
        background: "none",
        transition: "all 0.25s",
        "&:hover": {
            background: "none",
        },
    },
    playButtonContainer: {
        background: "url('/img/play-icon-black.svg') center / cover",
    },
};


class DesktopDiscoverPlayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            time: "00:00",
            playing: false
        };

        this.audio = new Audio(props.audio);
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
    }

    pauseAudio() {
        this.audio.pause();
        this.setState({
            playing: false
        });
    }

    setListeners() {

        console.log("SETTING LSITER", this.audio);
        this.audio.addEventListener('ended',() => {
            this.pauseAudio();
        });

        this.audio.ontimeupdate = () => {
            this.updateProgress();
        };
    }

    componentDidMount() {
        this.setListeners();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.audio !== this.props.audio) {
            this.pauseAudio();
            this.audio = new Audio(this.props.audio);
            this.setListeners();
            this.setState({
                progress: 0
            });
        }
    }

    componentWillUnmount() {
        this.pauseAudio();
    }

    updateProgress() {
        this.setState({
            progress: this.audio.currentTime / this.audio.duration,
            time: this.calculateTotalValue(this.audio.currentTime)
        });
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
        let { classes, src, dark, chapter} = this.props;

        const { progress, time } = this.state;
        const end = this.calculateTotalValue(this.audio.duration || 0);


        return (<div id={"audio" + this.id} className={classes.container} style={{fontFamily: "UntitledSans-Regular", letterSpacing: "-0.25px", width: this.state.playing ? `${width}px` : null, transition: "0.5s", overflow: "hidden", borderRadius: `${height}px`}}>
            <div style={{display: "flex", width: `${width}px`, transition: "0.5s", overflow: "hidden", borderRadius: `${height}px`, background: this.state.playing ? "url('/img/discover-gradient.png') left center / 300% no-repeat" : (dark ? "white" : "black"),
                animation: "backgroundmove 5s infinite",
                backgroundPosition: "left",
                backgroundSize: "500%",
                animationTimingFunction: "ease-in-out",
                color: (dark ? (this.state.playing ? "white" : "black") : "white"), height: `${height}px`}}>
                <div style={{flex: `0 0 ${height}px`, marginRight: "10px"}}>
                    <div onClick={() => {this.toggleAudio()}} className={classes.playButton} style={{ display: "inline-block", cursor:"pointer", height: `${height}px`, lineHeight: `${height}px`, textAlign: "center", width: `${height}px`, borderRadius: "100%",
                        animation: "backgroundmove 5s infinite",
                        backgroundPosition: "left",
                        animationTimingFunction: "ease-in-out"
                    }}>
                        <div className={classes.playButtonContainer} style={{display: "inline-block", height: "100%", width: "100%", background: (this.state.playing ? "url('/img/pause-icon.svg') center / 37px no-repeat" : ( dark ? "url('/img/play-icon-white.svg') center / cover" : null)), }}>

                        </div>
                    </div>
                </div>
                <div style={{flex: 1, paddingRight: "50px", fontSize: "30px", position: "relative"}}>
                    <div style={{position: "absolute", left: 0, width: "calc(100% - 50px)", top: "calc(50% - 61px)"}}>
                        <div style={{marginTop: "23px", marginBottom: "3px"}}><span style={{fontFamily: "UntitledSans-Bold"}}>Chapter:</span> {chapter}</div>
                        <div style={{width: "100%",}}>
                            <div style={{display: "flex", fontFamily: "UntitledSans-Regular", lineHeight: "20px", fontSize: "27px"}}>
                                <div style={{flex: "0 0 15px"}}>{time}</div>
                                <div style={{flex: 1, margin: "0 16px", position: "relative"}}>
                                    <div style={{height: "6px", position: "absolute", top: "calc(50% - 1.5px)", width: "100%", background: "#84827b50", borderRadius: "5px"}}>
                                        <div style={{height: "100%", background: "white", width: `${progress * 100}%`, borderRadius: "5px", transition: "all 0.5s cubic-bezier(0.39, 0.58, 0.57, 1) 0s"}}/>
                                    </div>
                                </div>
                                <div style={{flex: "0 0 15px"}}>{end}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>)
    }

}

export default withRouter(injectSheet(Styles)(DesktopDiscoverPlayer))
