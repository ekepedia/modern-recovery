import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

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
                <div style={{outline: "none",height: "595px" }} className={'share-mobile' + this.id}>
                    <div style={{padding: "56px 30px", outline: "none", textAlign: "center"}}>
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
                        <div style={{marginTop: "18px"}} onClick={() => {this.setState({mobileIndex2: 1})}} className={classes.joinButton}>
                            Join the movement
                        </div>
                    </div>
                    <div style={{padding: "56px 30px", outline: "none", textAlign: "center"}}>
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
                                   type="text" placeholder={"Enter Your Name"} className={classes.inputBox}/>

                            <input id="email" maxLength="80" name="email"
                                   size="20"
                                   type="text" placeholder={"Enter Your Email"} className={classes.inputBox}/>

                            <input type="submit" name="submit" value={sentBot ? "Sent" : "Sign Up"} className={classes.signUpButton}
                                   style={{
                                       background: sent ? "linear-gradient(90deg, rgba(107,214,197,0) 30%, rgba(255,255,255,0.7) 49%, rgba(60,190,89,0) 70%) left / 600%" : null,
                                       animationName: sent ? "backgroundmove2" : null,
                                       animationDuration: "1.5s",
                                       animationDelay: "0",
                                       color: changeSentText ? "rgba(0,0,0,0)" : (sent ? "white" : null),
                                       animationTimingFunction: "ease-in-out"}}
                            />

                        </form>
                    </div>
                    <div style={{padding: "56px 30px", outline: "none", textAlign: "center", height: "595px"}}>
                        <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "10px"}}>Share</div>
                        <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "335px", margin: "auto", marginBottom: "50px"}}>
                            Let’s write the story of modern recovery together. Tag us at @jointempest and tell us what <span style={{textDecoration: "underline"}}>#modernrecovery</span> means to you, use our new Instagram filter to share your recovery story, and download and share these posts to spread awareness.
                        </div>
                        <div style={{display: "flex", padding: "0"}}>
                            <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}}>
                                <img style={{width: "70%", position: "absolute", left: 0, top: "calc(50% - 7px)"}} src={"/img/left-arrow.png"}/>
                            </div>
                            <div style={{flex: 1, textAlign: "center", outline: "none",}}>
                                <a style={{outline: "none"}} href={"/img/share-1.png"} download={true}>
                                    <img style={{border: "1px solid white", outline: "none", width: "100%", maxWidth: "211px", margin: "auto"}} src={"/img/share-1.png"}/>
                                </a>
                            </div>
                            <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}}>
                                <img style={{width: "70%", position: "absolute", right: 0, top: "calc(50% - 7px)"}} src={"/img/right-arrow.png"}/>
                            </div>
                        </div>

                        {/*<a href={"/img/share-1.png"} style={{textDecoration: "none",}} download={true}>*/}
                        {/*    <div style={{marginTop: "50px"}} className={classes.joinButton}>*/}
                        {/*        Download All*/}
                        {/*    </div>*/}
                        {/*</a>*/}
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    {[0,1,2].map((pillar, index) => {
                        return (
                            <div key={"qm" + index} onClick={() => this.changeSlide(index)} style={{
                                opacity: index === shareIndex ? 1 : 0.2,
                                marginRight: index === 2 ? 0 : "15px",
                                height: "10px",
                                width: "10px",
                                borderRadius: "100%",
                                background: "white",
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


export default withRouter(injectSheet(Styles)(MobileShare))
