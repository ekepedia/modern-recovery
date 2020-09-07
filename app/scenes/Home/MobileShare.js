import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';
import MobileSocial from "./MobileSocial";
import GlobalStore from "../../store/GlobalStore";

const SANS_SERIF_FONT_BODY = {
    fontFamily: "UntitledSans-Regular",
    letterSpacing: "-0.25px",
}

const Styles = {
};

class MobileShare extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shareIndex: 0
        }

        this.id = Math.round(Math.random() * 10000);
        this.slickClass = '.share-mobile' + this.id;
    }

    startSlick() {
        $(this.slickClass).slick({
            arrows: false,
            infinite: false,
        }).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            console.log(event.target.className, event.target.className.indexOf('share-mobile') === -1);

            if (event.target.className.indexOf('share-mobile') === -1)
                return;

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

        let {classes, handleSalesForceSubmit, badName, badEmail, sentBot, sent, sending, changeSentText, pillars, copyToClipboard, copied} = this.props;

        const { shareIndex } = this.state;

        return (
            <div>
                <div style={{textAlign: "center", marginTop: "38px"}}>
                    {[0,1,2].map((pillar, index) => {
                        return (
                            <div key={"qm" + index} onClick={() => this.changeSlide(index)} style={{
                                paddingRight: index === 2  ? 0 : "15px",
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
                <div style={{outline: "none",height: "530px" }} className={'share-mobile' + this.id}>
                    <div style={{padding: "28px 30px", outline: "none", textAlign: "center"}}>
                        <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "24px"}}>
                            We do recovery differently.
                        </div>
                        <div style={{...SANS_SERIF_FONT_BODY, fontSize: "14px", maxWidth: "315px", margin: "auto"}}>
                            We’re empowering folks at every stage of their journey to examine their relationship with alcohol— on their own terms. If alcohol is no longer serving you or helping you live the life you want, now’s the time to try something new.
                            <br/><br/>
                            We hope this movement inspires you to question drinking culture and shed outdated ideas around what it means to be sober or in recovery.
                            <br/><br/>
                            This is Modern Recovery, and all<br/> are welcome.
                        </div>
                        <div style={{marginTop: "18px"}} onClick={() => {GlobalStore.track("Pillars", "Click", "Join the Movement"); this.changeSlide(1)}} className={classes.joinButton}>
                            Join the movement
                        </div>
                    </div>
                    <div style={{padding: "28px 30px", outline: "none", textAlign: "center"}}>
                        <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "10px"}}>Sign Up</div>
                        <div className={classes.modernRecoveryText} style={{...SANS_SERIF_FONT_BODY, maxWidth: "335px", margin: "auto", marginBottom: "50px"}}>
                            Get involved with Modern Recovery, with stories and resources sent straight to your inbox. You’ll also receive a 15% discount to the Tempest Membership plan of your choice.
                        </div>
                        <form onSubmit={(e) => handleSalesForceSubmit(e)}
                              action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
                              method="POST">
                            <input type="hidden" name="oid" value="00D1U000000rAh6"/>
                            <input type="hidden" name="retURL"
                                   value="http://jointempest.com/"/>

                            <input type="hidden" name="Campaign_ID" value="7012H000001OpghQAC" />
                            <input type="hidden" name="member_status" value="Responded" />

                            {/*<input type="hidden" name="debug" value="1"/>*/}
                            {/*<input type="hidden" name="debugEmail"/>*/}

                            <input id="last_name" maxLength="80" name="last_name" size="20"
                                   type="text" placeholder={"Enter Your Name"} className={classes.inputBox} style={{borderColor: badName ? "red" : null}}/>

                            <input id="email" maxLength="80" name="email"
                                   size="20"
                                   type="text" placeholder={"Enter Your Email"} className={classes.inputBox} style={{borderColor: badEmail ? "red" : null}}/>

                            <div className={classes.signUpButton}
                                 style={{
                                     position: "relative",
                                     background: sent ? (sentBot ? "black" : "white") : null,
                                     overflow: "hidden",
                                     color: sentBot ? "white" : null,
                                     transition: "0.5s",
                                     boxSizing: "border-box"
                                 }}
                            >
                                <input type="submit" name="submit"
                                       value={"Sign Up"}
                                       style={{
                                           height: "100%",
                                           width: "100%",
                                           fontFamily: "UntitledSans-Medium",
                                           letterSpacing: "1px",
                                           textTransform: "uppercase",
                                           outline: "none",
                                           border: "none",
                                           background: "none"
                                       }}
                                />
                                <div style={{
                                    position: "absolute",
                                    height: "100%",
                                    width: "100%",
                                    left: 0,
                                    top: 0,
                                    background: "none",
                                    borderRadius: "100px",
                                    overflow: "hidden",
                                    opacity: sentBot && sent ? 0 : 1,
                                    transition: "1s"
                                }}>
                                    <button type={"submit"} style={{position: "relative", height: "100%", width: "100%", background: "none", border: "none"}}>
                                        <div style={{
                                            position: "absolute",
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: "100px",
                                            left: sent && sending ? "0" : "-100%",
                                            top: 0,
                                            transition: "left 2s, opacity 1s, color 0.5s",
                                            background: "url('/img/discover-gradient.png') left center / 300% no-repeat",
                                            animation: "backgroundmove 4s infinite",
                                            animationTimingFunction: "ease-in-out",
                                            color: changeSentText ? "white" : "rgba(0,0,0,0)"
                                        }}>SENT!</div>
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div style={{padding: "28px 30px", outline: "none", textAlign: "center", height: "530px"}}>
                        <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "10px"}}>Share</div>
                        <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "335px", margin: "auto", marginBottom: "50px"}}>
                            Let’s write the story of modern recovery together. Tag us at @jointempest and tell us what <div
                            style={{
                                textDecoration: "underline",
                                display: "inline-block",
                                cursor: "pointer",
                                position: "relative"
                            }}

                            onClick={() => {
                                copyToClipboard()
                            }}
                        >
                            <div style={{
                                position: "absolute",
                                background: "white",
                                top: -30,
                                color: "black",
                                borderRadius: "15px",
                                padding: "5px 0px",
                                textAlign: "center",
                                width: "70px",
                                left: "calc(50% - 35px)",
                                opacity: copied ? 1 : 0,
                                transition: "0.5s"
                            }}>Copied!
                            </div>
                            #modernrecovery
                        </div> means to you, use our new Instagram filter to share your recovery story, and download and share these posts to spread awareness.
                        </div>
                        <div style={{padding: "0"}}>
                            <MobileSocial {...{classes, pillars }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(injectSheet(Styles)(MobileShare))
