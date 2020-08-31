import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

import DesktopChapterPlayer from "./DesktopChapterPlayer";

const Styles = {
};

class MobileQuotes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quoteIndex: 0
        }
        this.id = Math.round(Math.random() * 10000);
    }

    componentDidMount() {
        $(document).ready(() => {
            $('.quotes-mobile' + this.id).slick({
                arrows: false,
                infinite: false
            }).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
                console.log('edge was hit')
                this.setState({
                    quoteIndex: nextSlide
                });
            });
        });
    }

    changeSlide(i) {
        $('.quotes-mobile' + this.id).slick('slickGoTo', i);
    }

    componentWillUnmount() {
        $('.quotes-mobile' + this.id).slick('unslick');
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
                            <div key={"qm" + index} onClick={() => this.changeSlide(index)} style={{opacity: index === quoteIndex ? 1 : 0.2, marginRight: "15px", height: "7px", width: "7px", borderRadius: "100%", background: "black", transition: "1s", display: "inline-block",}}>

                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
}


export default withRouter(injectSheet(Styles)(MobileQuotes))
