import React from "react";

import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import panzoom from "panzoom";

const Styles = {
};

const ZOOM_FACTOR = 0.05;
const IMG_HEIGHT = 3072;
const IMG_WIDTH = 5760;

var myaudio = new Audio('/img/test-audio.m4a');

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.instance = null;
        this.id = Math.round(Math.random() * 10000);
    }

    componentDidMount() {

        const holder = this.props.holder;

        myaudio.addEventListener('ended',() => {
            this.setState({
                playing: false
            })
        })

        const element = document.querySelector('#scene' + this.id);

        const width  = document.getElementById(holder).clientWidth;
        const height = document.getElementById(holder).clientHeight;

        console.log(width, height, (height - (width/(IMG_WIDTH/IMG_HEIGHT)))/2, (width/(IMG_WIDTH/IMG_HEIGHT)));

        this.instance = panzoom(element, {
            zoomSpeed: 0.95,
            pinchSpeed: 1,
            minZoom: width/IMG_WIDTH,
            bounds: true,
        });

        this.instance.zoomAbs(
            0, // initial x position
            (height - (width/(IMG_WIDTH/IMG_HEIGHT)))/2 - 53/2,//(width/2), // initial y position
            width/IMG_WIDTH // initial zoom
        );

    }

    componentWillUnmount() {
        if (this.instance)
            this.instance.pause();
    }

    render() {
        let { classes, src } = this.props;

        return (<div id={"scene" + this.id} style={{height: `${IMG_HEIGHT}px`, position: "relative", width: `${IMG_WIDTH}px`, transition: "background 1s", background: `url('${src}') 0% 0% / contain no-repeat`, }}>
            <div>
                <div onClick={() => {
                    if (this.state.playing)
                        myaudio.pause()
                    else
                        myaudio.play();
                    this.setState({playing: !this.state.playing})
                }} style={{position: "absolute", top: "850px", left: "475px", width: this.state.playing ? "300px" : "90px", transition: "width 0.5s", background: "url('/img/discover-play.png') left no-repeat black", cursor: "pointer", borderRadius: "45px", height: "90px"}}>

                </div>
            </div>

        </div>)
    }

}

export default withRouter(injectSheet(Styles)(Canvas))
