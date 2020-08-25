import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

import Canvas from './Canvas';
import DesktopChapterPlayer from "./DesktopChapterPlayer";

import { STAGES, PILLARS } from "./copy";

const SANS_SERIF_FONT = {
    fontFamily: "UntitledSans-Regular",
    //fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "-1px",
}

const SANS_SERIF_FONT_BODY = {
    fontFamily: "UntitledSans-Regular",
    //fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "-0.25px",
}

const Styles = {
    container: {
        cursor: "auto",
        color: "black",
    },
    Desktop: {
        height: "100%",
        width: "100%",
        '@media (max-width: 798px)': {
            display: "none"
        },
    },
    Mobile: {
        height: "100%",
        width: "100%",
        display: "none",
        '@media (max-width: 798px)': {
            display: "block"
        },
    },
    heroBackground: {
        flex: "0 0 390px",
        '@media (max-width: 1370px)': {
            flex: "0 0 250px",
        },
    },
    mainBoxContainer: {
        flex: "0 0 489.12px",
        '@media (max-width: 1370px)': {
            flex: 1
        },
    },
    tabNameMobile: {
        fontFamily: "Casta Regular",
        fontSize: "48px",
        cursor: "pointer",
    },
    tabName: {
        fontFamily: "Casta Regular",
        fontSize: "25px",
        lineHeight: "17px",
        marginBottom: "65px",
        cursor: "pointer",
        transition: "0.5s",
        "&:hover": {
            fontSize: "50px",
        },
        '@media (max-width: 1370px)': {
            "&:hover": {
                fontSize: "40px",
            },
        },
    },
    tabBigName: {
        fontFamily: "Casta Regular",
        fontSize: "68px",
        lineHeight: "64px",
        marginBottom: "65px",
        cursor: "pointer",
        transition: "0.25s",
        '@media (max-width: 1370px)': {
            fontSize: "55px",
        },
    },
    dot: {
        height: "11px",
        width: "11px",
        borderRadius: "100%",
        background: "#0e0e0e",
        cursor: "pointer",
        marginBottom: "9px",
        opacity: 0.2,
        transition: "0.5s",
        "&:hover": {
            opacity: "0.5",
        },
    },
    pillarBar: {
        borderLeft: "1px solid",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.25s",
        "&:hover": {
            background: "rgba(0,0,0,0.3)",
        },
    },
    joinButton: {
        textAlign: "center",
        fontSize: "12px",
        height: "47px",
        lineHeight: "47px",
        border: "1px solid white",
        borderRadius:"23px",
        width: "198px",
        margin: "auto",
        cursor: "pointer",
        transition: "0.5s",
        fontFamily: "UntitledSans-Medium",
        letterSpacing: "1px",
        textTransform: "uppercase",
        "&:hover": {
            background: "white",
            color: "black"
        }
    },
    signUpButton:  {
        textAlign: "center",
        fontSize: "12px",
        height: "47px",
        lineHeight: "47px",
        borderRadius:"23px",
        width: "100%",
        maxWidth: "326px",
        margin: "auto",
        cursor: "pointer",
        border: "1px solid white",
        color: "white",
        background: "black",
        transition: "0.5s",
        fontFamily: "UntitledSans-Medium",
        letterSpacing: "1px",
        textTransform: "uppercase",
        "&:hover": {
            background: "white",
            color: "black"
        }
    },
    modernRecoveryText: {
        ...SANS_SERIF_FONT
    },
    inputBox: {
        width: "100%",
        maxWidth: "326px",
        margin: "auto",
        marginBottom: "28px",
        border: "1px solid white",
        ...SANS_SERIF_FONT,
        height: "47px",
        lineHeight: "47px",
        background: "none",
        borderRadius: "25px",
        paddingLeft: "33px",
        "&:focus": {
            outline: "none"
        },
        display: "block"
    },
    logoImage: {
        "&:hover": {
            animation: "wiggle infinite 1.5s alternate",
            transformOrigin: "bottom"
        }
    }
};

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.pillars = PILLARS;

        this.state = {
            textIndex: 0,
            textIndexBot: 0,
            pillars: false,
            stage: STAGES[0],
            stageIndex: 0,
            chapter: false,
            chapterBot: false,
            changingMode: false,

            mobileIndex1: 0,
            mobileIndex2: 0,
            mobileIndex3: 0,

            showInfoModal: true
        }
    }

    setIndex(index) {
        const stage = STAGES[index];
        this.setState({
            changingState: true,
            stageIndex: index,
        });

        setTimeout(() => {
            this.setState({
                stage,
                changingState: false,
                textIndex: 0,
                textIndexBot: 0,
            });

            // $(document).ready(function(){
            //     $('.quotes-mobile').slick({
            //         arrows: false,
            //     });
            // });
        }, 500);
    }

    setChapterMode() {

        if (this.state.chapterBot) return;

        this.setState({
            mounted: false,
            chapterBot: true,
            changingMode: true,
        });

        this.setTextState(0);
        this.setIndex(0);

        setTimeout(() => {
            this.setState({
                chapter: true,
                mounted: true,
                changingMode: false,
                pillars: false
            });

        }, 1000);
    }

    setDiscoverMode() {

        if (!this.state.chapterBot) return;

        this.setState({
            mounted: false,
            chapterBot: false,
            changingMode: true,
            dark: false,
            darkBot: false,
        });
        setTimeout(() => {
            this.setState({
                chapter: false,
                mounted: true,
                changingMode: false,
                pillars: false
            });

            this.setTextState(0);
            this.setIndex(0);
        }, 1000);
    }

    toggleChapter() {

        if (this.state.chapter)
            return this.setDiscoverMode();
        else
            return this.setChapterMode();

    }

    toggleLightDark(mode) {
        this.setState({
            darkBot: mode !== undefined ? mode : !this.state.darkBot,
            changingDark: true,
        });
        setTimeout(() => {
            this.setState({
                dark: mode !== undefined ? mode : !this.state.dark,
                changingDark: false
            })
        }, 1000);
    }

    componentDidMount() {
        window.screenTop = 0;
        this.setIndex(0);
        setTimeout(() => {
            this.setState({
                mounted: true
            })
        }, 500);

        window.onmousemove = (event) => {
            setTimeout(() => {
                let follower = document.getElementById('custom-cursor');
                follower.style.display = "block";
                follower.style.top = (event.clientY - 25)+ 'px'
                follower.style.left = (event.clientX -25) + 'px'
            }, 0)
        }

        // $(document).ready(function(){
        //     $('.quotes-mobile').slick({
        //         arrows: false,
        //     });
        // });

    }

    setTextState(textIndex) {
        this.setState({
            changeText: true,
            textIndexBot: textIndex
        });
        setTimeout(() => {
            this.setState({
                textIndex,
                changeText: false
            })
        }, 500);
    }

    render() {
        let { classes } = this.props;

        return (<div className={classes.container} style={{background: STAGES[this.state.stageIndex].gradient, transition: "1s"}}>
            <div className={classes.Desktop}>
                <div id={"custom-cursor"} style={{opacity: 0.5, display: "none", pointerEvents: "none", zIndex: 1000, position: "fixed", height: "50px", width: "50px", background: "grey", borderRadius: "100%"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden"}}>
                    <div style={{background: "white", flex: "0 0 53px", zIndex: 99, boxShadow: "0px 1px 4px #00000011", overflow: "hidden"}}>
                        <div style={{display: "flex", padding: "0 22px", height: "100%"}}>

                            <div style={{flex: 1, lineHeight: "53px", fontFamily: "GT-America-Mono-Trial-Regular", fontSize: "14px", position: "relative"}}>
                                <span style={{...SANS_SERIF_FONT, fontSize: "14px", marginRight: "8px"}}>A Project by</span><img className={classes.logoImage} onClick={() => {window.open("http://jointempest.com/")}} style={{height: "12px", cursor: "pointer", position: "absolute", top: 21, left: 72, }} src={"/img/tempest-logo.png"}/>
                            </div>

                            <div style={{flex: 1, lineHeight: "53px", textAlign: "center", fontFamily: "NoeDisplay Medium", fontSize: "24px", textTransform: "capitalize", letterSpacing: "-0.25px"}}>
                                <span style={{cursor: "pointer"}} onClick={() => {this.setDiscoverMode()}}>Modern Recovery</span>
                            </div>

                            <div style={{flex: 1, fontFamily: "Roboto", height: "100%", overflow: "hidden", textAlign: "right", fontSize: "14px"}}>
                                <div style={{display: "inline-block", opacity: this.state.chapterBot ? 0 : 1, transition: "1s", padding: "11px 0", height: "100%", overflow: "hidden"}}>
                                    <div onClick={() => {this.toggleLightDark()}} style={{marginLeft: "16px", textAlign: "left", cursor: "pointer", position: "relative", padding: "6px", display: "inline-block", fontSize: "14px", border: "1px solid", lineHeight: "30px", height: "100%", width: "100px", borderRadius: "15px"}}>
                                        <div style={{display: "inline-block", marginRight: "10px", height: "18px", position: "absolute", left: this.state.darkBot ? 74 : 6, transition: "all 1s", border: "1px solid black", width: "18px", background: this.state.darkBot ? "black" : "#7dc49b", borderRadius: "100%"}}>

                                        </div>
                                        <div style={{lineHeight: "30px", fontSize: "12px", ...SANS_SERIF_FONT, position: "absolute", top: 0, right: this.state.dark ? 30 : 10, opacity: this.state.changingDark ? 0 : 1, transition: "opacity 0.5s", display: "inline-block"}}>
                                            <div style={{display: "inline-block", overflow: "hidden"}}>
                                                {this.state.dark ? "Dark" : "Light"} Mode
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display: "inline-block", padding: "11px 0", height: "100%", overflow: "hidden"}}>
                                    <div onClick={() => {this.toggleChapter()}} style={{marginLeft: "16px", textAlign: "left", cursor: "pointer", position: "relative", padding: "6px", display: "inline-block", fontSize: "14px", border: "1px solid", lineHeight: "30px", height: "100%", width: "120px", borderRadius: "15px"}}>
                                        <div style={{display: "inline-block", marginRight: "10px", height: "18px", position: "absolute", left: !this.state.chapterBot ? 94 : 6, transition: "all 1s", border: "1px solid black", width: "18px", background: this.state.chapterBot ? "url('https://www.covid19tracker.news/img/gradient.png')" : "#7dc49b",
                                            animation: "backgroundmove 5s infinite",
                                            animationTimingFunction: "ease-in-out",
                                            borderRadius: "100%"}}>
                                        </div>
                                        <div style={{lineHeight: "30px", fontSize: "14px", whiteSpace: "nowrap", ...SANS_SERIF_FONT, position: "absolute", top: 0, right: !this.state.chapter ? 27 : 10, opacity: this.state.changingMode ? 0 : 1, transition: "opacity 0.5s", display: "inline-block"}}>
                                            <div style={{display: "inline-block"}}>
                                                {this.state.chapter ? "Chapter" : "Discover"} Mode
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.chapter ?
                        <div style={{flex: 1, height: "100%", width: "100%", opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                            <div style={{display: "flex", height: "100%", width: "100%"}}>
                                <div style={{flex: this.state.pillars ? 0 : 1, transition: "1s", overflow: "hidden", height: "100%"}}>
                                    <div style={{display: "flex", height: "100%", width: "calc(100vw - 46px)"}}>
                                        <div className={classes.heroBackground} style={{transition: "background 0.5s", background: `url(${STAGES[this.state.stageIndex].img}) 0% 0% / cover no-repeat`}}>

                                        </div>
                                        <div style={{flex: "1"}}>
                                            <div style={{paddingLeft: "60px", paddingRight: "60px", width: "100%", height: "100%"}}>
                                                <div style={{display: "flex", width: "100%", height: "100%"}}>
                                                    <div className={classes.mainBoxContainer} style={{height: "100%", opacity: this.state.changingState ? 0 : 1, transition: "0.5s"}}>
                                                        <div style={{paddingTop: "calc((100vh - 476.88px - 53px)/2)"}}>
                                                            <div style={{padding: "50px", width: "100%", height: "476.88px", position: "relative", borderRadius: "7px", background: "rgba(255,255, 255, 0.1)"}}>
                                                                <div style={{position: "absolute", top: 50, right: 40}}>
                                                                    {this.state.stage.quotes.map((q, i) => {
                                                                        return <div key={"q" + i} style={{opacity: this.state.textIndexBot === i ? 1 : null}} onClick={() => {this.setTextState(i)}} className={classes.dot}/>
                                                                    })}
                                                                </div>
                                                                <div style={{fontSize: "16px", maxWidth: "300px", lineHeight: "24px",  fontFamily: "Albra Text Regular",}}>
                                                                    <span style={{fontFamily: "Albra Text Bold"}}>{this.state.stage.name}:</span> {this.state.stage.definition}
                                                                </div>
                                                                <div style={{marginTop: "80px", fontSize: "118px", lineHeight: "0px", fontFamily: "MADE Soulmaze Outline"}}>
                                                                    “
                                                                </div>
                                                                <div style={{marginTop: "20px", height: "150px", overflow: "scroll", maxWidth: "395px", fontSize: "16px", lineHeight: "26px", fontFamily: "Albra Text Regular", opacity: this.state.changeText ? 0 : 1, transition: "0.5s"}}>
                                                                    {this.state.stage.quotes[this.state.textIndex].quote ? this.state.stage.quotes[this.state.textIndex].quote : this.state.stage.quotes[this.state.textIndex] }
                                                                </div>
                                                                <div style={{width: "100%", display: "flex", position: "absolute", bottom: 0, left: 0, padding: "50px", paddingRight: "26px"}}>
                                                                    <div style={{flex: 1, textAlign: "right"}}>
                                                                        <DesktopChapterPlayer audio={this.state.stage.quotes[this.state.textIndexBot].audio ? this.state.stage.quotes[this.state.textIndexBot].audio : "/img/test-audio.m4a"}/>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div style={{flex: 1, textAlign: "right", overflow: "hidden", height: "100%"}}>
                                                        <div style={{paddingTop: "calc((100vh - 476.88px - 53px)/2)"}}>
                                                            {STAGES.map((stage, i) => {
                                                                return (<div key={stage.name} onClick={() => {this.setIndex(i)}} className={this.state.stageIndex === i ? classes.tabBigName : classes.tabName}>{stage.name}</div>);
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{transition: "1s", flex: this.state.pillars ? 1 : "0 0 46px", overflow: "hidden", height: "100%"}}>
                                    <div style={{display: "flex", height: "100%"}}>
                                        <div className={classes.pillarBar} style={{flex: "0 0 46px", border: this.state.pillars ? "none" : null, background: this.state.pillars ? "white" : null, transition: this.state.pillars ? "1s" : "0.25s", height: "100%"}} onClick={() => {this.setState({pillars: !this.state.pillars})}}>
                                            <div style={{textAlign: "center"}}>
                                                <img src={"/img/close-button.png"} style={{width: "16px", transition: "1s", opacity: this.state.pillars ? 1 : 0, marginTop: "15px", display: "inline-block"}}/>
                                            </div>
                                            <div style={{transform: "rotate(-90deg)",
                                                margin: "auto",
                                                position: "absolute",
                                                fontSize: "14px",
                                                top: "calc((100vh - 53px)/2 + 95px - 200px/2)",
                                                ...SANS_SERIF_FONT,
                                                width: "200px",
                                                left: "-77"}}>
                                                <div style={{
                                                    display: "inline-block",
                                                    height: "15px",
                                                    width: "15px",
                                                    background: this.state.pillars ? "black" : "none",
                                                    borderRadius: "100%",
                                                    marginRight: "10px",
                                                    border: "1px solid"
                                                }}/>
                                                What is Modern Recovery?
                                            </div>
                                        </div>
                                        <div style={{flex: "1", overflow: "hidden"}}>
                                            <div style={{display: "flex", height: "100%", width: "calc(100vw - 46px)"}}>
                                                <div style={{flex: 1, overflow: "scroll", color: "white", textAlign: "center", height: "100%"}}>
                                                    <div style={{paddingTop: "150px", paddingBottom: "150px", background: "black",}}>
                                                        <div style={{fontSize: "48px", fontFamily: "NoeDisplay Regular", lineHeight: "60px", marginBottom: "50px"}}>What is this<br/> project about?</div>
                                                        <div style={{maxWidth: "400px", ...SANS_SERIF_FONT_BODY, margin: "auto", fontSize: "14px", lineHeight: "24px", }}>
                                                            We’re empowering folks at every stage of their journey—whether you’re just exploring your relationship with alcohol, recently sober, or have been alcohol-free for years. Recovery is a profoundly personal process, and everyone’s path is valid.
                                                            <br/><br/>
                                                            We hope this campaign inspires you to question drinking culture and shed outdated ideas and stereotypes around what it means to be sober or in recovery.
                                                            <br/><br/>
                                                            This is Modern Recovery, and all are welcome.
                                                        </div>
                                                        <div style={{marginTop: "30px"}}>
                                                            <div className={classes.joinButton}>
                                                                Join the Movement
                                                            </div>
                                                        </div>
                                                        <div style={{width: "1.5px", height: "102px", background: "white", margin:"auto", marginTop: "25px", marginBottom: "40px"}}>

                                                        </div>
                                                        <div style={{fontSize: "48px", fontFamily: "NoeDisplay Regular", lineHeight: "60px", marginBottom: "10px"}}>Sign Up</div>
                                                        <div className={classes.modernRecoveryText} style={{...SANS_SERIF_FONT_BODY, maxWidth: "350px", margin: "auto", marginBottom: "50px"}}>Learn more about our Modern Recovery event series and get a 15% discount to the Tempest Membership plan of your choice.</div>
                                                        <form
                                                            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
                                                            method="POST">
                                                            <input type="hidden" name="oid" value="00D1U000000rAh6"/>
                                                            <input type="hidden" name="retURL"
                                                                   value="http://jointempest.com/"/>

                                                            <input type="hidden" name="debug" value="1"/>
                                                            <input type="hidden" name="debugEmail"/>

                                                            <input id="last_name" maxLength="80" name="last_name" size="20"
                                                                   type="text" placeholder={"Enter Your Name"} className={classes.inputBox}/>

                                                            <input id="email" maxLength="80" name="email"
                                                                   size="20"
                                                                   type="text" placeholder={"Enter Your Email"} className={classes.inputBox}/>

                                                            <input type="submit" name="submit" value={"Sign Up"} className={classes.signUpButton} />

                                                        </form>



                                                        <hr style={{height: "1px", width: "70%", borderTop: "1px dotted white", background: "none", margin:"auto", marginTop: "40px", marginBottom: "40px"}}></hr>
                                                        <div style={{fontSize: "48px", fontFamily: "NoeDisplay Regular", lineHeight: "60px", marginBottom: "10px"}}>Share</div>
                                                        <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "350px", margin: "auto", marginBottom: "50px"}}>
                                                            Let’s write the story of modern recovery together. Tag us at @jointempest and tell us what <span style={{textDecoration: "underline"}}>#modernrecovery</span> means to you. Download and share these posts to spread awareness.
                                                        </div>
                                                        <div style={{display: "flex", padding: "0 40px"}}>
                                                            <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}}>
                                                                <img style={{width: "100%", position: "absolute", left: 0, top: "calc(50% - 10px)"}} src={"/img/left-arrow.png"}/>
                                                            </div>
                                                            <div style={{flex: 1, textAlign: "center"}}>
                                                                <div style={{padding: "0 10px"}}>
                                                                    <img style={{border: "1px solid white", width: "100%", margin: "auto"}} src={"/img/share2.png"}/>
                                                                </div>
                                                            </div>
                                                            <div style={{flex: 1, textAlign: "center"}}>
                                                                <div style={{padding: "0 10px"}}>
                                                                    <img style={{border: "1px solid white", width: "100%", margin: "auto"}} src={"/img/share-1.png"}/>
                                                                </div>
                                                            </div>
                                                            <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}}>
                                                                <img style={{width: "100%", position: "absolute", right: 0, top: "calc(50% - 10px)"}} src={"/img/right-arrow.png"}/>
                                                            </div>
                                                        </div>
                                                        <hr style={{height: "1px", width: "70%", borderTop: "1px dotted white", background: "none", margin:"auto", marginTop: "40px", marginBottom: "40px"}}></hr>
                                                        <div>
                                                            <div style={{fontSize: "48px", fontFamily: "NoeDisplay Regular", lineHeight: "60px", marginBottom: "10px"}}>Join In</div>
                                                            <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "350px", margin: "auto", marginBottom: "50px"}}>We’ll be hosting a series of virtual events in honor of Recovery Month. RSVP to save your spot!
                                                            </div>
                                                            {[0,1].map((i) => {
                                                                return (
                                                                    <div key={"mmj" + i} style={{display: "flex", maxWidth: "290px", margin: "auto", marginBottom: "50px"}}>
                                                                        <div style={{flex: "0 0 117px"}}>
                                                                            <div style={{height: "92px", width: "92px", background: "white", borderRadius: "100%"}}></div>
                                                                        </div>
                                                                        <div style={{flex: 1}}>
                                                                            <div style={{...SANS_SERIF_FONT_BODY, textAlign: "left", fontSize: "12px"}}>Join MadHappy and Tempest for a Tie Dyeing Class</div>
                                                                            <div style={{height: "40px", fontFamily: "UntitledSans-Medium", letterSpacing: "1px", marginTop: "20px", width: "83px", fontSize: "12px", borderRadius: "20px", border: "1px solid white", lineHeight: "40px"}}>RSVP</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div style={{flex: 1, color: "white", overflow: "scroll", height: "100%"}}>
                                                    <div style={{paddingLeft: "100px", paddingRight: "100px", paddingBottom: "100px", paddingTop: "150px", background: "linear-gradient(#8b99af,#bab8b4)"}}>
                                                        <div style={{marginBottom: "50px", textAlign: "center", fontSize: "48px", lineHeight: "60px", fontFamily: "NoeDisplay Regular"}}>
                                                            What is Modern<br/> Recovery?
                                                        </div>
                                                        <div style={{margin: "auto", fontSize: "14px", ...SANS_SERIF_FONT, marginBottom: "50px", textAlign: "center", maxWidth: "350px", letterSpacing: "-0.25px"}}>
                                                            We created these six pillars of Modern Recovery to encompass our mission to put individuals at the center of their own healing. This is more than just quitting alcohol—it’s about gaining back your life.
                                                        </div>
                                                        {this.pillars.map((pillar, index) => {
                                                            return (
                                                                <div key={"p" + index} style={{marginBottom: "70px"}}>
                                                                    <div style={{display: "flex"}}>
                                                                        <div style={{flex: "0 0 140px"}}>
                                                                            <div style={{fontSize: "60px", lineHeight: "60px", fontFamily: "NoeDisplay Regular"}}>
                                                                                <div style={{height: "112px", lineHeight: "112px", textAlign: "center", width: "112px", border: "2px solid white", borderRadius: "100%"}}>
                                                                                    0{index + 1}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{flex: 1}}>
                                                                            <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "335px", fontSize: "14px", lineHeight: "20px"}}>
                                                                                <div style={{marginBottom: "6px", fontFamily: "UntitledSans-Medium",}}>{pillar.title}</div>
                                                                                {pillar.body}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div id="canvas-holder" style={{flex: 1, background: this.state.darkBot ? "#272F46" : "#E4D7C4", height: "100%", width: "100%", textAlign: "center", opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                            <Canvas holder="canvas-holder" dark={this.state.darkBot} src={this.state.darkBot ? "/img/mural-dark.jpg" : "/img/mural-light.jpg"}/>
                            <div style={{position: "fixed", top: 77, left: 44, cursor: "pointer", height: "19px", width: "19px"}} onClick={() => {this.setState({showInfoModal: !this.state.showInfoModal})}}>
                                <img style={{height: "100%", width: "100%", transition: "0.5s"}} src={this.state.darkBot ? "/img/info-icon-white.png" : "/img/info-icon.png"}/>
                            </div>
                            <div style={{...SANS_SERIF_FONT_BODY, letterSpacing: "0", opacity: this.state.showInfoModal ? 1 : 0, transition: "0.5s", padding: "25px", textAlign: "left", fontSize: "12px", background: this.state.darkBot ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)", color: this.state.darkBot ? "black" : "white", position: "fixed", bottom: 53, left: 92, height: "fit-content", width: "300px", boxShadow: "0px 1px 4px #00000011"}}>
                                <div style={{position: "absolute", height: "10px", width: "10px", top: 12, right: 17, cursor: "pointer"}} onClick={() => {this.setState({showInfoModal: false})}}>
                                    <img style={{height: "100%", width: "100%", transition: "0.5s"}} src={this.state.darkBot ? "/img/close-button.png" : "/img/white-x.png"}/>
                                </div>
                                <div style={{fontFamily: "Albra Text Regular", marginTop: "8px", fontSize: "18px"}}>
                                    Exploring the Recovery Journey
                                </div>
                                <div style={{marginTop: "8px"}}>
                                    The Recovery Journey captures a few of the many experiences people move through on their personal recovery paths. It is not meant to be linear, and there’s no one way or right way to move along it. Take your time and immerse yourself in the stories.
                                </div>
                                <div style={{ marginTop: "8px"}}>
                                    <span style={{fontFamily: "UntitledSans-Bold"}}>Discover:</span> Use your track pad or mouse to pull, press and hold to  drag and  zoom into the mural.
                                </div>
                                <div style={{ marginTop: "8px"}}>
                                    <span style={{fontFamily: "UntitledSans-Bold"}}>Listen:</span> Press play to listen to audio stories of real people.
                                </div>
                                <div style={{ marginTop: "8px"}}>
                                    <span style={{fontFamily: "UntitledSans-Bold"}}>Click:</span> On different parts of mural to read which part of the recovery journey it is.
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={classes.Mobile}>
                <div style={{height: "100%", width: "100%", overflow: "hidden", display: "flex", flexDirection: "column"}}>
                    <div style={{flex: "0 0 84px", background: "white"}}>
                        <div style={{height: "48px", lineHeight: "48px", padding: "0 18px", display: "flex"}}>
                            <div style={{flex: 1, fontFamily: "NoeDisplay Medium", fontSize: "18px", letterSpacing: "-0.25px"}}>
                                <span style={{cursor: "pointer"}} onClick={() => {this.setDiscoverMode()}}>Modern Recovery</span>
                            </div>
                            <div style={{flex: 1, textAlign: "right", postion: "relative"}}>
                                <span style={{...SANS_SERIF_FONT, cursor: "pointer", fontSize: "14px", marginRight: "4px"}}>A Project by</span><img onClick={() => {window.open("http://jointempest.com/")}} style={{height: "12px", cursor: "pointer",}} src={"/img/tempest-logo.png"}/>
                            </div>
                        </div>
                        <div style={{...SANS_SERIF_FONT_BODY, cursor: "pointer", fontSize: "12px", height: "36px", lineHeight: "36px", display: "flex", borderTop: "1px solid black", borderBottom: this.state.pillars ? null : "1px solid black"}}>
                            <div style={{flex: 1, textAlign: "center", background: this.state.chapterBot ? "white" : "black", color: this.state.chapterBot ? "black" : "white" }} onClick={() => {this.setDiscoverMode()}}>
                                Discover Mode
                            </div>
                            <div style={{flex: 1, textAlign: "center", background: this.state.chapterBot ? "black" : "white", color: this.state.chapterBot ? "white" : "black"}} onClick={() => {this.setChapterMode()}}>
                                Chapter Mode
                            </div>
                        </div>
                    </div>
                    <div style={{flex: 1, overflow: "hidden"}}>
                        {this.state.chapter ?
                            <div id="mobile-scroll-container" style={{height: "100%", width: "100%", overflowY: "scroll", opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <div style={{flex: this.state.pillars ? 0 : 1, overflow: this.state.pillars ? "hidden" : null, display: this.state.pillars ? "none" : null}}>
                                        <div style={{transition: "background 0.5s", width: "100%", height: "calc((100vh - 84px) * 0.60)", background: `url(${STAGES[this.state.stageIndex].img}) 0% 0% / cover no-repeat`}}/>
                                        <div style={{height: "fit-content", background: STAGES[this.state.stageIndex].gradient}}>
                                            <div style={{padding: "24px 30px"}}>
                                                <div style={{display: "flex"}}>
                                                    <div onClick={() => {
                                                        let index = this.state.stageIndex - 1;

                                                        if (index < 0) index = STAGES.length - 1;
                                                        if (index > STAGES.length - 1) index = 0;

                                                        this.setIndex(index);
                                                    }} style={{flex: 1, cursor: "pointer"}}>


                                                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17 4.5C17.2761 4.5 17.5 4.27614 17.5 4C17.5 3.72386 17.2761 3.5 17 3.5V4.5ZM0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM17 3.5L1 3.5V4.5L17 4.5V3.5Z" fill="black"/>
                                                        </svg>

                                                    </div>
                                                    <div onClick={() => {
                                                        let index = this.state.stageIndex + 1;

                                                        if (index < 0) index = STAGES.length - 1;
                                                        if (index > STAGES.length - 1) index = 0;

                                                        this.setIndex(index);
                                                    }} style={{flex: 1, cursor: "pointer", textAlign: "right"}}>
                                                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5L1 3.5ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5L17 4.5V3.5L1 3.5L1 4.5Z" fill="black"/>
                                                        </svg>

                                                    </div>
                                                </div>
                                                <div style={{...SANS_SERIF_FONT_BODY, fontSize: "14px", marginTop: "20px"}}>
                                                    Stage {this.state.stageIndex + 1}
                                                </div>
                                                <div className={classes.tabNameMobile}>
                                                    {STAGES[this.state.stageIndex].name}
                                                </div>
                                            </div>
                                            <div style={{height: "282px", width: "1px", margin: "auto", background: "black"}} />

                                            <div className={"quotes-mobile"}>
                                                <div style={{padding: "24px 30px"}}>
                                                    <div  style={{background: "rgba(255,255,255,0.1)", opacity: this.state.changingState ? 0 : 1, transition: "0.5s", padding: "30px", position: "relative", height: "411px", borderRadius: "8px"}}>
                                                        <div style={{fontSize: "14px", maxWidth: "300px", lineHeight: "22px", ...SANS_SERIF_FONT}}>
                                                            {this.state.stage.name}: {this.state.stage.definition}
                                                        </div>
                                                        <div style={{marginTop: "60px", fontSize: "80px", lineHeight: "0px", fontFamily: "MADE Soulmaze Outline"}}>
                                                            “
                                                        </div>
                                                        <div style={{marginTop: "10px", height: "180px", overflow: "scroll", maxWidth: "395px", fontSize: "14px", lineHeight: "22px", fontFamily: "Albra Text Regular", opacity: this.state.changeText ? 0 : 1, transition: "0.5s"}}>
                                                            {this.state.stage.quotes[this.state.mobileIndex1].quote ? this.state.stage.quotes[this.state.mobileIndex1].quote : this.state.stage.quotes[this.state.mobileIndex1] }
                                                        </div>

                                                        <div style={{width: "100%", display: "flex", position: "absolute", bottom: 18, left: 0, padding: "0 30px", paddingRight: "30px"}}>
                                                            <div style={{flex: 1, textAlign: "right"}}>
                                                                <DesktopChapterPlayer audio={this.state.stage.quotes[this.state.mobileIndex1].audio ? this.state.stage.quotes[this.state.mobileIndex1].audio : "/img/test-audio.m4a"}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{textAlign: "center", paddingBottom: "100px"}}>
                                                    {this.state.stage.quotes.map((pillar, index) => {
                                                        return (
                                                            <div  onClick={() => this.setState({mobileIndex1: index})} key={"qm" + index} style={{marginRight: "15px", height: "7px", width: "7px", borderRadius: "100%", background: "black", opacity: index === this.state.mobileIndex1 ? 1 : 0.2, transition: "1s", display: "inline-block",}}>

                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{flex: this.state.pillars ? 1 : "0 0 140px", overflow: this.state.pillars ? null : "hidden"}}>
                                        <div style={{height: "fit-content"}}>
                                            <div style={{...SANS_SERIF_FONT_BODY, height: this.state.pillars ? "53px" : "140px", textAlign: "center", lineHeight: "53px", borderTop: "1px solid black", background: this.state.pillars ? "white" : "none", color: "black",

                                                position: this.state.pillars ? "absolute" : null,
                                                top: this.state.pillars ? "84px" : null,
                                                width: this.state.pillars ? "100%" : null,
                                                zIndex: this.state.pillars ? "100" : null,


                                            }} onClick={() => {
                                                this.setState({pillars: !this.state.pillars})
                                                const scroll = document.getElementById('mobile-scroll-container');
                                                if (scroll) scroll.scrollTop = 0;
                                            }}>
                                                <div style={{
                                                    display: "inline-block",
                                                    height: "15px",
                                                    width: "15px",
                                                    background: this.state.pillars ? "black" : "none",
                                                    borderRadius: "100%",
                                                    marginRight: "7px",
                                                    border: "1px solid",


                                                }}/>
                                                What is Modern Recovery?
                                            </div>

                                            <div style={{background: "black", paddingTop: this.state.pillars ? "53px" : null,
                                                height: "calc(100vh - 84px)", color: "white", position: "relative"}}>
                                                <div>
                                                    <div style={{height: "530px"}}>
                                                        <div style={{padding: "56px 30px", textAlign: "center", display: this.state.mobileIndex2 === 0 ? null : "none"}}>
                                                            <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "24px"}}>
                                                                What is this project about?
                                                            </div>
                                                            <div style={{...SANS_SERIF_FONT_BODY, fontSize: "14px", maxWidth: "280px", margin: "auto"}}>
                                                                We’re empowering folks at every stage of their journey—whether you’re just exploring your relationship with alcohol, recently sober, or have been alcohol-free for years. Recovery is a profoundly personal process, and everyone’s path is valid.
                                                                <br/><br/>
                                                                We hope this campaign inspires you to question drinking culture and shed outdated ideas and stereotypes around what it means to be sober or in recovery.
                                                                <br/><br/>
                                                                This is Modern Recovery, and all<br/> are welcome.
                                                            </div>
                                                            <div style={{marginTop: "18px"}} onClick={() => {this.setState({mobileIndex2: 1})}} className={classes.joinButton}>
                                                                Join the movement
                                                            </div>
                                                        </div>
                                                        <div style={{padding: "56px 30px", textAlign: "center", display: this.state.mobileIndex2 === 1 ? null : "none"}}>
                                                            <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "10px"}}>Sign Up</div>
                                                            <div className={classes.modernRecoveryText} style={{...SANS_SERIF_FONT_BODY, maxWidth: "335px", margin: "auto", marginBottom: "50px"}}>Learn more about our Modern Recovery event series and get a 15% discount to the Tempest Membership plan of your choice.</div>
                                                            <form
                                                                action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
                                                                method="POST">
                                                                <input type="hidden" name="oid" value="00D1U000000rAh6"/>
                                                                <input type="hidden" name="retURL"
                                                                       value="http://jointempest.com/"/>

                                                                <input type="hidden" name="debug" value="1"/>
                                                                <input type="hidden" name="debugEmail"/>

                                                                <input id="last_name" maxLength="80" name="last_name" size="20"
                                                                       type="text" placeholder={"Enter Your Name"} className={classes.inputBox}/>

                                                                <input id="email" maxLength="80" name="email"
                                                                       size="20"
                                                                       type="text" placeholder={"Enter Your Email"} className={classes.inputBox}/>

                                                                <input type="submit" name="submit" value={"Sign Up"} className={classes.signUpButton} />

                                                            </form>
                                                        </div>
                                                        <div style={{padding: "56px 30px", textAlign: "center", display: this.state.mobileIndex2 === 2 ? null : "none"}}>
                                                            <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "10px"}}>Share</div>
                                                            <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "335px", margin: "auto", marginBottom: "50px"}}>
                                                                Let’s write the story of modern recovery together. Tag us at @jointempest and tell us what <span style={{textDecoration: "underline"}}>#modernrecovery</span> means to you. Download and share these posts to spread awareness.
                                                            </div>
                                                            <div style={{display: "flex", padding: "0"}}>
                                                                <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}}>
                                                                    <img style={{width: "70%", position: "absolute", left: 0, top: "calc(50% - 7px)"}} src={"/img/left-arrow.png"}/>
                                                                </div>
                                                                <div style={{flex: 1, textAlign: "center"}}>
                                                                    <img style={{border: "1px solid white", width: "100%", maxWidth: "211px", margin: "auto"}} src={"/img/share-1.png"}/>
                                                                </div>
                                                                <div style={{flex: "0 0 34px", cursor: "pointer", position: "relative"}}>
                                                                    <img style={{width: "70%", position: "absolute", right: 0, top: "calc(50% - 7px)"}} src={"/img/right-arrow.png"}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{padding: "56px 30px", textAlign: "center", display: this.state.mobileIndex2 === 3 ? null : "none"}}>
                                                            <div style={{fontSize: "24px", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "10px"}}>Join In</div>
                                                            <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "335px", margin: "auto", marginBottom: "50px"}}>We’ll be hosting a series of virtual events in honor of Recovery Month. RSVP to save your spot!
                                                            </div>
                                                            {[0,1].map((i) => {
                                                                return (
                                                                    <div key={"j" + i} style={{display: "flex", maxWidth: "290px", margin: "auto", marginBottom: "50px"}}>
                                                                        <div style={{flex: "0 0 117px"}}>
                                                                            <div style={{height: "92px", width: "92px", background: "white", borderRadius: "100%"}}></div>
                                                                        </div>
                                                                        <div style={{flex: 1}}>
                                                                            <div style={{...SANS_SERIF_FONT_BODY, textAlign: "left", fontSize: "12px"}}>Join MadHappy and Tempest for a Tie Dyeing Class</div>
                                                                            <div style={{height: "40px", fontFamily: "UntitledSans-Medium", letterSpacing: "1px", marginTop: "20px", width: "83px", fontSize: "12px", borderRadius: "20px", border: "1px solid white", lineHeight: "40px"}}>RSVP</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center"}}>
                                                        {[1,2,3,4].map((pillar, index) => {
                                                            return (
                                                                <div  onClick={() => this.setState({mobileIndex2: index})} key={"mp" + index} style={{marginRight: index === 3 ? 0 : "15px", height: "7px", width: "7px", borderRadius: "100%", background: "white", opacity: index === this.state.mobileIndex2 ? 1 : 0.2, transition: "1s", display: "inline-block",}}>

                                                                </div>
                                                            )
                                                        })}
                                                    </div>


                                                </div>
                                                <div style={{position: "absolute", left: "calc(50% - 1px)", bottom: 0, height: "50px", background: "white", width: "1px"}}>

                                                </div>

                                            </div>

                                            <div style={{background: "linear-gradient(#8b99af,#bab8b4)", color: "white"}}>
                                                <div style={{height: "235px", background: "white", width: "1px", margin: "auto"}}>

                                                </div>
                                                <div style={{padding: "56px 30px", textAlign: "center"}}>
                                                    <div style={{fontSize: "24px", color: "white", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "24px"}}>
                                                        What is Modern Recovery?
                                                    </div>
                                                    <div style={{...SANS_SERIF_FONT_BODY, fontSize: "14px", maxWidth: "335px", margin: "auto"}}>
                                                        We created these six pillars of Modern Recovery to encompass our mission to put individuals at the center of their own healing. This is more than just quitting alcohol—it’s about gaining back your life.
                                                    </div>
                                                </div>
                                                <div style={{width: "100%", overflow: "hidden"}}>
                                                    <div style={{marginBottom: "70px", display: "inline-block", width: "100vw"}}>
                                                        <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                                            <div style={{flex: "0 0 107px"}}>
                                                                <div style={{fontSize: "48px", lineHeight: "87px", fontFamily: "NoeDisplay Regular"}}>
                                                                    <div style={{height: "87px", lineHeight: "87px", textAlign: "center", width: "87px", margin: "auto", border: "2px solid white", borderRadius: "100%"}}>
                                                                        0{this.state.mobileIndex3 + 1}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{flex: 1}}>
                                                                <div style={{...SANS_SERIF_FONT_BODY, margin: "auto", maxWidth: "335px", height: "150px", fontSize: "14px", lineHeight: "20px"}}>
                                                                    <div style={{marginBottom: "6px", fontFamily: "UntitledSans-Medium",}}>{this.pillars[this.state.mobileIndex3].title}</div>
                                                                    {this.pillars[this.state.mobileIndex3].body}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", paddingBottom: "100px"}}>
                                                        {this.pillars.map((pillar, index) => {
                                                            return (
                                                                <div  onClick={() => this.setState({mobileIndex3: index})} key={"mmp" + index} style={{marginRight: "15px", height: "7px", width: "7px", borderRadius: "100%", background: "white", opacity: index === this.state.mobileIndex3 ? 1 : 0.2, transition: "1s", display: "inline-block",}}>

                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                </div>


                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                            :
                            <div style={{opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                                <div id="canvas-holder-mobile" style={{background: this.state.darkBot ? "#272F46" : "#E4D7C4", height: "100%", width: "100%", textAlign: "center", opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                                    <Canvas holder="canvas-holder-mobile" dark={this.state.darkBot} src={this.state.darkBot ? "/img/mural-dark.jpg" : "/img/mural-light.jpg"}/>
                                </div>
                                <div style={{position: "fixed", top: 100, left: 20, cursor: "pointer", height: "19px", width: "19px"}} onClick={() => {this.setState({showInfoModal: !this.state.showInfoModal})}}>
                                    <img style={{height: "100%", width: "100%"}} src={this.state.darkBot ? "/img/info-icon-white.png" : "/img/info-icon.png"}/>
                                </div>
                                <div style={{...SANS_SERIF_FONT_BODY, display: this.state.showInfoModal ? null : "none", transition: "0.5s", padding: "25px", textAlign: "left", fontSize: "11px", background: this.state.darkBot ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)", color: this.state.darkBot ? "black" : "white", position: "fixed", bottom: "calc(50% - 176px)", left: "calc( 50% - 135px)", height: "305px", width: "270px", boxShadow: "0px 1px 4px #00000011"}}>
                                    <div style={{position: "absolute", height: "10px", width: "10px", top: 12, right: 17, cursor: "pointer"}} onClick={() => {this.setState({showInfoModal: false})}}>
                                        <img style={{height: "100%", width: "100%"}} src={this.state.darkBot ? "/img/close-button.png" : "/img/white-x.png"}/>
                                    </div>
                                    <div style={{fontFamily: "Albra Text Regular", marginTop: "8px", fontSize: "14px"}}>
                                        Exploring the Recovery Journey
                                    </div>
                                    <div style={{marginTop: "8px"}}>
                                        The Recovery Journey captures a few of the many experiences people move through on their personal recovery paths. It is not meant to be linear, and there’s no one way or right way to move along it. Take your time and immerse yourself in the stories.
                                    </div>
                                    <div style={{ marginTop: "8px"}}>
                                        <span style={{fontFamily: "UntitledSans-Bold"}}>Discover:</span> Use your track pad or mouse to pull, press and hold to  drag and  zoom into the mural.
                                    </div>
                                    <div style={{ marginTop: "8px"}}>
                                        <span style={{fontFamily: "UntitledSans-Bold"}}>Listen:</span> Press play to listen to audio stories of real people.
                                    </div>
                                    <div style={{ marginTop: "8px"}}>
                                        <span style={{fontFamily: "UntitledSans-Bold"}}>Click:</span> On different parts of mural to read which part of the recovery journey it is.
                                    </div>
                                </div>
                                <div style={{position: "fixed", bottom: "0", left: "0", width: "100%", height: "36px",}}>
                                    <div style={{...SANS_SERIF_FONT_BODY, cursor: "pointer", fontSize: "12px", height: "36px", lineHeight: "36px", display: "flex", borderTop: "1px solid black"}}>
                                        <div style={{flex: 1, textAlign: "center", background: this.state.darkBot ? "white" : "black", color: this.state.darkBot ? "black" : "white" }} onClick={() => {this.toggleLightDark(false)}}>
                                            Light Mode
                                        </div>
                                        <div style={{flex: 1, textAlign: "center", background: this.state.darkBot ? "black" : "white", color: this.state.darkBot ? "white" : "black"}} onClick={() => {this.toggleLightDark(true)}}>
                                            Dark Mode
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            </div>);
    }

}

export default withRouter(injectSheet(Styles)(Home))
