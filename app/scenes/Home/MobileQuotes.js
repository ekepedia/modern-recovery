import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

import DesktopChapterPlayer from "./DesktopChapterPlayer";
import dispatcher from "../../dispatcher";

const Styles = {
};

class MobileQuotes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quoteIndex: 0
        }
        this.id = Math.round(Math.random() * 10000);
        this.slickClass = '.quotes-mobile' + this.id;
    }

    componentDidMount() {
        $(document).ready(() => {
            this.startSlick();
        });
    }

    startSlick() {
        $(this.slickClass).slick({
            arrows: false,
            infinite: true
        }).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            dispatcher.dispatch({
                type: "PAUSE-ALL",
            });
            this.setState({
                quoteIndex: nextSlide
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.pillars !== this.props.pillars || prevProps.chapter !== this.props.chapter) {
            if (this.props.pillars) {
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

    componentWillUnmount() {
        this.stopSlick();
    }

    render() {

        let {classes, changingState, stage, changeText, textIndex, mobileIndex1} = this.props;

        const { quoteIndex } = this.state;

        return (
            <div>
                <div style={{outline: "none"}} className={"quotes-mobile" + this.id}>
                    {stage.quotes.map((quote, index) => {
                        return (
                            <div key={index + "Dd"} style={{padding: "24px 30px", outline: "none"}}>
                                <div style={{
                                    background: "rgba(255,255,255,0.1)",
                                    opacity: changingState ? 0 : 1,
                                    transition: "0.5s",
                                    padding: "30px",
                                    position: "relative",
                                    height: "411px",
                                    borderRadius: "8px",
                                    outline: "none"
                                }}>
                                    <div style={{
                                        fontSize: "14px",
                                        maxWidth: "300px",
                                        lineHeight: "22px",
                                        fontFamily: "Albra Text Regular",

                                    }}>
                                        {stage.name}: {stage.definition}
                                    </div>
                                    <div style={{
                                        marginTop: "60px",
                                        fontSize: "80px",
                                        lineHeight: "0px",
                                        fontFamily: "MADE Soulmaze Outline"
                                    }}>
                                        “
                                    </div>
                                    <div className={`quotes-holder`} style={{
                                        marginTop: "10px",
                                        height: "165px",
                                        overflowY: "scroll",
                                        paddingRight: "10px",
                                        maxWidth: "395px",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        fontFamily: "Albra Text Regular",
                                        opacity: changeText ? 0 : 1,
                                        transition: "0.5s"
                                    }}>
                                        {quote.quote}
                                        <br/>
                                        <span
                                            style={{fontFamily: "Albra Text Bold"}}>-{quote.author}</span>
                                    </div>

                                    <div style={{
                                        width: "100%",
                                        display: "flex",
                                        position: "absolute",
                                        bottom: 18,
                                        left: 0,
                                        padding: "0 30px",
                                        paddingRight: "30px"
                                    }}>
                                        <div style={{flex: 1, textAlign: "right"}}>
                                            <DesktopChapterPlayer
                                                audio={quote.audio}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={{textAlign: "center"}}>
                    {stage.quotes.map((pillar, index) => {
                        return (
                            <div key={"qm" + index} onClick={() => this.changeSlide(index)} style={{
                                opacity: index === quoteIndex ? 1 : 0.2,
                                marginRight: index === stage.quotes.length - 1 ? 0 : "20px",
                                height: "10px",
                                width: "10px",
                                borderRadius: "100%",
                                background: "black",
                                transition: "1s",
                                display: "inline-block",
                            }}>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}


export default withRouter(injectSheet(Styles)(MobileQuotes))
