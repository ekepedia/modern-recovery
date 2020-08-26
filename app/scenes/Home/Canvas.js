import React from "react";

import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import panzoom from "panzoom";
import DesktopDiscoverPlayer from "./DesktopDiscoverPlayer";

const Styles = {
};

const ZOOM_FACTOR = 0.05;
const IMG_HEIGHT = 3072;
const IMG_WIDTH = 5760;

var myaudio = new Audio('/img/test-audio.m4a');

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ether: false

        };
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

        const minZoom = width < 768 ? height/IMG_HEIGHT : width/IMG_WIDTH;

        this.instance = panzoom(element, {
            zoomSpeed: 0.95,
            pinchSpeed: 1,
            minZoom,
            bounds: false,
            // boundsPadding: 0.5,
            onTouch: (e) => {
                console.log(e);
                console.log(e.target)
                console.log(e.target.id, `scene${this.id}`);

                if (e.target.id === `scene${this.id}`)
                    return true;

                return false;
            }

        });

        this.instance.zoomAbs(
            width < 768 ? -150 : 0, // initial x position
            width < 768 ? -35: (height - (width/(IMG_WIDTH/IMG_HEIGHT)))/2 - 53/2,//(width/2), // initial y position
            minZoom // initial zoom
        );

        this.instance.on('pan', (e) => {

            return;

            const width  = document.getElementById(holder).clientWidth;
            const transform = e.getTransform();
            //
            // console.log(transform);
            // console.log(transform.x, transform.x / transform.scale, width, IMG_WIDTH);
            // console.log(transform.x / transform.scale + IMG_WIDTH, transform.x / transform.scale + IMG_WIDTH - width, transform.x + IMG_WIDTH);

            const xBoundScale = transform.x / transform.scale + IMG_WIDTH - width / transform.scale;
            const yBoundScale = transform.y / transform.scale + IMG_HEIGHT - height / transform.scale;

            console.log("PANN")
            console.log("bounds x:", transform.x, xBoundScale, width - IMG_WIDTH * transform.scale);
            console.log("bounds y:", transform.y, yBoundScale, (height - (width/(IMG_WIDTH/IMG_HEIGHT)))/2 - 53/2);

            let xPos = transform.x;
            let yPos = transform.y;

            let change = false;
            const buffer = 0;

            if (transform.x > buffer) {
                console.log("FIRST CASE: X");

                xPos = 0;
                change = true;
            } else if (xBoundScale < (0 - buffer) && Math.abs(transform.x) > 10) {
                console.log("SECOND CASE: X");

                console.log("moving x", transform.x, "to", width - IMG_WIDTH * transform.scale)
                xPos = width - IMG_WIDTH * transform.scale;//transform.x + 1;
                change = true;
            }

            // if (transform.y < buffer) {
            //     console.log("FIRST CASE: Y");
            //     yPos = 0;
            //     change = true;
            // }
            // else if (yBoundScale < (0 - buffer) && Math.abs(transform.y) > 10) {
            //     console.log("SECOND CASE: Y");
            //     yPos = transform.y + 1;
            //     change = true;
            // }

            if (change) {
                if (this.changes > 1000)
                    return console.log("MAX CHANGES");

                console.log(this.changes, "changiings to ", xPos, yPos, transform.x, transform.y)

                //this.instance.moveTo(xPos, yPos);
                this.changes = this.changes || 0;
                this.changes = this.changes + 1;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {

                }, 0);
            }


        })

    }

    componentWillUnmount() {
        if (this.instance)
            this.instance.pause();
    }

    render() {
        let { classes, src, dark } = this.props;

        return (<div id={"scene" + this.id} onClick={(e) => {

            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;

            console.log("(", e.nativeEvent.offsetX, ",", e.nativeEvent.offsetY, ")")

            if (y > 1000 && x < 1000) {
                this.setState({
                    ether: true,
                    lastX: x,
                    lastY: y
                })
            }


        }} style={{height: `${IMG_HEIGHT}px`, position: "relative", width: `${IMG_WIDTH}px`, transition: "background 1s", background: `url('${src}') 0% 0% / contain no-repeat`, }}>
            <div>
                <div style={{position: "absolute", top: "850px", left: "441px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Ether/Nicole+P.+Ether.m4a'} chapter={"Ether"}/>
                </div>

                <div style={{position: "absolute", top: "1678px", left: "1092px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Inkling/Tina+-+Inkling.m4a'} chapter={"Inkling"}/>
                </div>
                <div style={{position: "absolute", top: "264px", left: "2822px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Awareness/Nicole+P.+Awareness.m4a'} chapter={"Awareness"}/>
                </div>
                <div style={{position: "absolute", top: `${this.state.lastY}px`, left: `${this.state.lastX}px`}}>
                    <div style={{height: "100px", width: "300px", background: "black", display: this.state.ether ? "block" : "none"}}>
                        <div onClick={() => {this.setState({ether: false})}}>CLOSE</div>
                    </div>
                </div>
            </div>

        </div>)
    }

}

export default withRouter(injectSheet(Styles)(Canvas))
