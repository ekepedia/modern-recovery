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

    initPanZoom() {
        const holder = this.props.holder;

        const element = document.querySelector('#scene' + this.id);

        const width  = document.getElementById(holder).clientWidth;
        const height = this.getHeight();

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
                // console.log(e.target)
                // console.log(e.target);


                if (e.target.id === `scene${this.id}` && this.props.closeModal) {
                    this.props.closeModal();

                    // console.log("TAP?", new Date().getTime());
                    this.lastTap = new Date().getTime();

                    setTimeout(() => {
                        let tapped = true;

                        if (!this.lastShift)
                            tapped = true;
                        else if (this.lastTap - this.lastShift < -50)
                            tapped = false;
                        else
                            tapped = true

                        // console.log("JUST A TAP?", tapped, this.lastTap - this.lastShift);

                        if (tapped) {
                            // this.setModal(e);
                            var touch = e.touches[0] || e.changedTouches[0];
                            let x = touch.pageX;
                            let y = touch.pageY;

                            const transform = this.instance.getTransform();

                            x = x/transform.scale - transform.x/transform.scale - (x/width)*(1250 * transform.scale)/transform.scale;
                            y = y/transform.scale - transform.y/transform.scale - 82/transform.scale;

                            this.setModal(e.target.id, x, y);


                        }
                    }, 100);
                }

                if (e.target.id === `scene${this.id}`)
                    return true;

                return false;
            },
            beforeMouseDown: (e) => {
                // allow mouse-down panning only if altKey is down. Otherwise - ignore
                // var shouldIgnore = !e.altKey;

                if (e.target.id === `scene${this.id}` && this.props.closeModal) {
                    this.props.closeModal();
                }

                if (e.target.id !== `scene${this.id}`)
                    return true;

                return false;
            }

        });

        let initY = ((height - (width/(IMG_WIDTH/IMG_HEIGHT)))/2 - 53/2);

        if (width < 768) {
            initY = 0;
        } else if (initY < 0) {
            console.log("SMOLLLLL")
            initY = height/width < IMG_HEIGHT/IMG_WIDTH ? initY : 0
        }

        this.instance.zoomAbs(
            width < 768 ? -150 : 0, // initial x position
            initY,
            minZoom // initial zoom
        );

        this.instance.on('zoom', (e) => {
            this.handleShift(e);
        });

        this.instance.on('pan', (e) => {
            this.handleShift(e);
        })
    }

    componentDidMount() {
        this.initPanZoom();

        $(window).on('resize', () => {
            this.instance.pause();
            this.initPanZoom();
        });

    }

    getHeight() {
        const holder = this.props.holder;

        const width  = document.getElementById(holder).clientWidth;
        const height = document.getElementById(holder).clientHeight;

        return  width < 768 ? height - 100 : height;
    }

    handleShift(e) {

        this.lastShift = new Date().getTime();

        const holder = this.props.holder;

        const width  = document.getElementById(holder).clientWidth;
        const height = this.getHeight();

        const transform = e.getTransform();
        const navHeight = 53;

        // console.log(transform);
        // console.log(transform.x, transform.x / transform.scale, width, IMG_WIDTH);
        // console.log(transform.x / transform.scale + IMG_WIDTH, transform.x / transform.scale + IMG_WIDTH - width, transform.x + IMG_WIDTH);

        const xBoundScale = IMG_WIDTH * transform.scale - width + transform.x;

        const yBoundScale = IMG_HEIGHT * transform.scale - height + transform.y;

        // console.log("PANN")
        // console.log(IMG_HEIGHT * transform.scale - height, "\n\n", IMG_HEIGHT * transform.scale, height, "\n\n");
        // console.log("bounds y:", transform.y, yBoundScale, "\n", transform.scale, height - IMG_HEIGHT * transform.scale);
        // console.log("bounds y:", transform.y, yBoundScale, (height - (width/(IMG_WIDTH/IMG_HEIGHT)))/2 - 53/2);

        let xPos = transform.x;
        let yPos = transform.y;

        let change = false;
        const buffer = 0;

        if (transform.x > buffer) {
            // console.log("FIRST CASE: X");

            xPos = 0;
            change = true;
        } else if (xBoundScale < (0 - buffer)) {
            // console.log("SECOND CASE: X");

            // console.log("moving x", transform.x, "to", width - IMG_WIDTH * transform.scale)
            xPos = width - IMG_WIDTH * transform.scale;//transform.x + 1;
            change = true;
        }

        // console.log("CHECK:", IMG_HEIGHT*transform.scale , height)

        if (IMG_HEIGHT*transform.scale < height) {
            // console.log("HEIGHT EXCEPTION!");
            // console.log();

            const YScale = height - IMG_HEIGHT*transform.scale - transform.y - navHeight;

            if (transform.y < 0) {
                // console.log("FIRST CASE 2: Y");
                yPos = 0;
                change = true;
            } else if (YScale < 0) {
                // console.log("SECOND CASE 2: Y")
                yPos = height - IMG_HEIGHT*transform.scale - navHeight;

                if (yPos < 0) {
                    // console.warn("SENDING Y TO BAD PLACE:", yPos);
                    yPos = 0;//transform.y
                    if (transform.y !== yPos)
                        change = true;
                } else {
                    change = true;
                }
            }
        } else {
            if (transform.y > buffer) {
                // console.log("FIRST CASE: Y");
                yPos = 0;
                change = true;
            }
            else if (yBoundScale < buffer) {
                // console.log("SECOND CASE: Y");
                yPos = height - IMG_HEIGHT * transform.scale;
                change = true;
            }
        }

        if (change) {

            if (this.changes > 1000) {
                if (!this.waitTimeout)
                    setTimeout(() => {
                        this.changes = 0;
                        this.waitTimeout = null;
                    }, 100);

                return console.log("too many changes");
            }
            // console.log(this.changes, "changiings to ", xPos, yPos, transform.x, transform.y)

            this.instance.moveTo(xPos, yPos);

            this.changes = this.changes || 0;
            this.changes = this.changes + 1;

            if (this.resetChanges)
                clearTimeout(this.resetChanges);

            this.resetChanges = setTimeout(() => {
                this.changes = 0;
            }, 1000);
        }
    }

    componentWillUnmount() {
        if (this.instance)
            this.instance.pause();
    }

    setModal(target, x, y) {

        if (target !== `scene${this.id}`)
            return;

        console.log("(", x, ",", y, ")")

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

                const transform = this.instance.getTransform();

                this.setModal(e.target.id, e.nativeEvent.offsetX - (0.5 * (1250 * transform.scale)/transform.scale), e.nativeEvent.offsetY);
            }
            this.move = false;
            this.moveTime = 0;
        }} style={{height: `${IMG_HEIGHT}px`, position: "relative", width: `${IMG_WIDTH}px`, transition: "background 1s", background: `url('${src}') 0% 0% / contain no-repeat`, }}>
            <div>
                <div style={{position: "absolute", top: "850px", left: "441px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Discover/Ether_v2.mp3'} chapter={"Ether"}/>
                </div>

                <div style={{position: "absolute", top: "1678px", left: "1092px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Discover/Inkling_v2.mp3'} chapter={"Inkling"}/>
                </div>
                <div style={{position: "absolute", top: "264px", left: "2822px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Discover/Awareness_v2.mp3'} chapter={"Awareness"}/>
                </div>

                <div style={{position: "absolute", top: "2657px", left: "2990px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Discover/Reckoning_v2.mp3'} chapter={"Reckoning"}/>
                </div>

                <div style={{position: "absolute", top: "2417px", left: "4510px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Discover/Rebuilding_v2.mp3'} chapter={"Rebuilding"}/>
                </div>

                <div style={{position: "absolute", top: "300px", left: "4700px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Discover/Outpouring_V2.mp3'} chapter={"Outpouring"}/>
                </div>
                <div style={{position: "absolute", top: `${this.state.lastY}px`, left: `${this.state.lastX}px`, }}>
                    <div style={{height: "fit-content", position: "relative", width: "1250px", textAlign: "left", padding: "78px", background: dark ? "white" : "black", color: dark ? "black" : "white", display: this.state.showChapterModal ? "block" : "none"}}>
                        <div style={{position: "absolute", top: 52, right: 52, cursor: "pointer", height: "46px", width: "46px"}} onClick={() => {this.setState({showChapterModal: false})}}>
                            <img style={{height: "100%", width: "100%"}} src={dark ? "/img/close-icon-black.svg" : "/img/close-icon-white.svg"}/>
                        </div>

                        <div style={{fontSize: "60px", width: "fit-content", marginBottom: "25px", fontFamily: "Albra Text Regular", color: dark ? "white" : "black", background: dark ? "black" : "white", padding: "0 50px", height: "92px", lineHeight: "92px", borderRadius: "100px"}}>
                            {STAGES[this.state.showChapterModalIndex].name}
                        </div>
                        <div style={{fontFamily: "UntitledSans-Regular", fontSize: "55px"}}>
                            {STAGES[this.state.showChapterModalIndex].definition}
                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }

}

export default withRouter(injectSheet(Styles)(Canvas))
