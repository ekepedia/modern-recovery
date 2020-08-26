import React from "react";

import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import panzoom from "panzoom";
import DesktopDiscoverPlayer from "./DesktopDiscoverPlayer";

import { STAGES } from "./copy";

const Styles = {
};

const ZOOM_FACTOR = 0.05;
const IMG_HEIGHT = 3072;
const IMG_WIDTH = 5760;

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showChapterModal: false,
            showChapterModalIndex: 0
        };
        this.instance = null;
        this.id = Math.round(Math.random() * 10000);
    }

    componentDidMount() {

        const holder = this.props.holder;

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
                // console.log(e);
                // console.log(e.target)
                // console.log(e.target.id, `scene${this.id}`);

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

    setModal(e) {

        if (e.target.id !== `scene${this.id}`)
            return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        console.log("(", e.nativeEvent.offsetX, ",", e.nativeEvent.offsetY, ")")

        let index = 0;

        if (y < 1500 ) {
            if (x < 1930) {
                index = 0;
            } else if ( x < 3840) {
                index = 2;
            } else {
                index = 5;
            }
        } else {
            if (x < 1930) {
                index = 1;
            } else if ( x < 3840) {
                index = 3;
            } else {
                index = 4;
            }
        }

        this.setState({
            showChapterModal: true,
            showChapterModalIndex: index,
            lastX: x,
            lastY: y
        })
    }

    render() {
        let { classes, src, dark } = this.props;

        return (<div id={"scene" + this.id} onMouseDown={(e) => {this.move = false; this.moveTime = new Date().getTime()}} onMouseMove={(e) => {this.move = true; }} onMouseUp={(e) => {
            if (!this.move || (new Date().getTime() - this.moveTime) < 150) {
                this.setModal(e);
            }
            this.move = false;
            this.moveTime = 0;
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

                <div style={{position: "absolute", top: "2657px", left: "2990px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Reckoninig/Nicole+P.+Reckoning.m4a'} chapter={"Reckoning"}/>
                </div>

                <div style={{position: "absolute", top: "2417px", left: "4510px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Rebuilding/Tina+-+Rebuilding.m4a'} chapter={"Rebuilding"}/>
                </div>

                <div style={{position: "absolute", top: "217px", left: "5250px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Outpouring/Valentine+Outpouring.mp3'} chapter={"Outpouring"}/>
                </div>
                <div style={{position: "absolute", top: `${this.state.lastY}px`, left: `${this.state.lastX}px`, }}>
                    <div style={{height: "fit-content", position: "relative", width: "1250px", textAlign: "left", padding: "78px", background: dark ? "white" : "black", color: dark ? "black" : "white", display: this.state.showChapterModal ? "block" : "none"}}>
                        <div style={{position: "absolute", top: 52, right: 52, cursor: "pointer", height: "46px", width: "46px"}} onClick={() => {this.setState({showChapterModal: false})}}>
                            <img style={{height: "100%", width: "100%"}} src={this.state.darkBot ? "/img/close-button.png" : "/img/white-x.png"}/>
                        </div>

                        <div style={{fontSize: "60px", width: "fit-content", marginBottom: "25px", fontFamily: "Albra Text Regular", color: dark ? "white" : "black", background: dark ? "black" : "white", padding: "0 50px", height: "92px", lineHeight: "92px", borderRadius: "100px"}}>
                            {STAGES[this.state.showChapterModalIndex].name}
                        </div>
                        <div style={{fontFamily: "UntitledSans-Regular", fontSize: "55px"}}>
                            We see our drinking in a new light and we wonder if things could be different.
                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }

}

export default withRouter(injectSheet(Styles)(Canvas))
