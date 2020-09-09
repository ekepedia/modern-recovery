import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';
import {PILLARS} from "./copy";

const SANS_SERIF_FONT_BODY = {
    fontFamily: "UntitledSans-Regular",
    letterSpacing: "-0.25px",
}

const Styles = {
};

class MobilePillars extends React.Component {

    constructor(props) {
        super(props);

        this.pillars = PILLARS;

        this.state = {
            shareIndex: 0
        }

        this.id = Math.round(Math.random() * 10000);
        this.slickClass = '.share-pillars' + this.id;
    }

    startSlick() {
        $(this.slickClass).slick({
            arrows: false,
            infinite: true,
            mobileFirst: true
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

    componentWillUnmount() {
        this.stopSlick();
    }

    render() {

        let {classes, handleSalesForceSubmit, sentBot, sent, changeSentText} = this.props;

        const { shareIndex } = this.state;

        return (
            <div>
                <div style={{outline: "none", }} className={'share-pillars' + this.id}>
                    {this.pillars.map((pillar, index) => {
                        return (
                            <div key={index + "DSDs"} style={{padding: "56px 30px", outline: "none", textAlign: "center"}}>
                                <div>
                                    <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                        <div style={{flex: "0 0 107px"}}>
                                            <div style={{fontSize: "48px", lineHeight: "87px", fontFamily: "NoeDisplay Regular"}}>
                                                <div style={{height: "87px", lineHeight: "87px", textAlign: "center", width: "87px", margin: "auto", border: "2px solid white", borderRadius: "100%"}}>
                                                    0{index + 1}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{flex: 1}}>
                                            <div style={{...SANS_SERIF_FONT_BODY, margin: "auto", maxWidth: "335px", height: "150px", fontSize: "14px", lineHeight: "20px"}}>
                                                <div style={{margin: index === 1 ? "auto" : null, marginBottom: "6px", maxWidth: index === 1 ? "220px" : null, fontFamily: "UntitledSans-Medium",}}>{pillar.title}</div>
                                                {pillar.body}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            );
                    })}
                </div>
                <div style={{textAlign: "center"}}>
                    {this.pillars.map((pillar, index) => {
                        return (
                            <div key={"qm" + index} onClick={() => this.changeSlide(index)} style={{
                                paddingRight: index === (this.pillars.length - 1) ? 0 : "15px",
                                display: "inline-block",
                                height: "20px"
                            }}>
                                <div style={{
                                    opacity: index === shareIndex ? 1 : 0.2,
                                    height: "10px",
                                    width: "10px",
                                    borderRadius: "100%",
                                    background: "white",
                                    transition: "1s",
                                }}>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}


export default withRouter(injectSheet(Styles)(MobilePillars))
