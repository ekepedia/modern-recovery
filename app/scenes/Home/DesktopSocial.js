import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

import { MEDIA } from "./copy";
import GlobalStore from "../../store/GlobalStore";

const SANS_SERIF_FONT_BODY = {
    fontFamily: "UntitledSans-Regular",
    letterSpacing: "-0.25px",
}

const Styles = {
};

class DesktopSocial extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }

        this.id = Math.round(Math.random() * 10000);
        this.slickClass = '.share-social-d' + this.id;
    }

    startSlick() {
        $(this.slickClass).slick({
            arrows: false,
            infinite: true,
            slidesToShow: 2,
            // centerMode: true,
        }).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            this.setState({
                shareIndex: nextSlide
            });
        });
    }

    stopSlick() {
        try {
            if ($(this.slickClass).slick)
                $(this.slickClass).slick('unslick');
        } catch (e) {

        }
    }

    componentDidMount() {
        $(document).ready(() => {
            this.startSlick();
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.pillars !== this.props.pillars) {
            if (!this.props.pillars) {
                this.stopSlick();
            } else {
                setTimeout(() => {
                    this.stopSlick();
                    this.startSlick();
                }, 10)
            }
        }
    }

    changeSlide(i) {
        $(this.slickClass).slick('slickGoTo', i);
    }

    nextSlide() {
        $(this.slickClass).slick('slickNext');
    }

    prevSlide() {
        $(this.slickClass).slick('slickPrev');
    }

    componentWillUnmount() {
        this.stopSlick();
    }

    render() {

        let {classes, handleSalesForceSubmit, sentBot, sent, changeSentText} = this.props;

        const { shareIndex } = this.state;

        return (
            <div>
                <div style={{display: "flex", padding: "0"}}>
                    <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}} onClick={() => {this.prevSlide()}}>
                        <img style={{width: "100%", position: "absolute", left: 0, top: "calc(50% - 7px)"}} src={"/img/arrow-left.svg"}/>
                    </div>
                    <div style={{flex: 1, textAlign: "center", outline: "none", overflow: "hidden"}}>
                        <div className={'share-social-d' + this.id} style={{height: "calc((100vw - 420px)/4)"}}>
                            {MEDIA.map((media, i) => {
                                return (
                                    <div key={media.link} style={{padding: "0 10px", position: "relative"}} onClick={() => {GlobalStore.track("Pillars", "Click", "Download Asset", i + 1)}}>
                                        <a style={{outline: "none"}} href={media.link} download={true} target={"_blank"} >
                                            <div className={classes.imgHoverContainer} >
                                                <div style={{position: "relative", height: "calc((100vw - 420px)/4)", width: "100%"}}>
                                                    <div className={classes.imgHover}>DOWNLOAD</div>
                                                </div>
                                            </div>
                                            <img style={{border: "1px solid white", width: "100%", margin: "auto"}} src={media.link}/>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}} onClick={() => {this.nextSlide()}}>
                        <img style={{width: "100%", position: "absolute", right: 0, top: "calc(50% - 7px)"}} src={"/img/arrow-right.svg"}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(injectSheet(Styles)(DesktopSocial))
