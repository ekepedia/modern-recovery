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

        const minZoom = width < 768 ? height/IMG_HEIGHT : width/IMG_WIDTH;

        this.instance = panzoom(element, {
            zoomSpeed: 0.95,
            pinchSpeed: 1,
            minZoom,
            bounds: true,
            onTouch: function(e) {
                return false;
            }

        });

        this.instance.zoomAbs(
            width < 768 ? -150 : 0, // initial x position
            width < 768 ? -35: (height - (width/(IMG_WIDTH/IMG_HEIGHT)))/2 - 53/2,//(width/2), // initial y position
            minZoom // initial zoom
        );

        this.instance.on('pan', (e) => {
            const transform = e.getTransform();
            //
            // console.log(transform);
            // console.log(transform.x, transform.x < 0, transform.x / transform.scale, IMG_WIDTH);

            // if (transform.x < 0) {
            //     this.instance.moveTo(0, transform.y);
            //
            //     if (transform.y < 0) {
            //         this.instance.moveTo(0, 0);
            //     }
            // }
            // if (transform.y < 0) {
            //     this.instance.moveTo(transform.x, 0);
            //
            //     if (transform.x < 0) {
            //         this.instance.moveTo(0, 0);
            //     }
            // }

        })

    }

    componentWillUnmount() {
        if (this.instance)
            this.instance.pause();
    }

    render() {
        let { classes, src, dark } = this.props;

        return (<div id={"scene" + this.id} style={{height: `${IMG_HEIGHT}px`, position: "relative", width: `${IMG_WIDTH}px`, transition: "background 1s", background: `url('${src}') 0% 0% / contain no-repeat`, }}>
            <div>
                <div style={{position: "absolute", top: "850px", left: "475px"}}>
                    <DesktopDiscoverPlayer dark={dark} audio={'https://draperu.s3.amazonaws.com/public/audio/Ether/Nicole+P.+Ether.m4a'} chapter={"Ether"}/>
                </div>
            </div>

        </div>)
    }

}

export default withRouter(injectSheet(Styles)(Canvas))
