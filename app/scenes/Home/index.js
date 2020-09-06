import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

import Canvas from './Canvas';
import DesktopChapterPlayer from "./DesktopChapterPlayer";
import dispatcher from "../../dispatcher";

import { STAGES, PILLARS } from "./copy";
import MobileQuotes from "./MobileQuotes";
import MobileShare from "./MobileShare";
import MobilePillars from "./MobilePillars";
import DesktopSocial from "./DesktopSocial";
import GlobalStore from "../../store/GlobalStore";

const SANS_SERIF_FONT = {
    fontFamily: "UntitledSans-Regular",
    letterSpacing: "-1px",
}

const SANS_SERIF_FONT_BODY = {
    fontFamily: "UntitledSans-Regular",
    letterSpacing: "-0.25px",
}

const Styles = {
    container: {
        cursor: "auto",
        color: "black",
        '@media (max-width: 1024px)': {
            cursor: "auto"
        },
    },
    Desktop: {
        height: "100%",
        width: "100%",
        '@media (max-width: 1024px)': {
            display: "none"
        },
    },
    Mobile: {
        height: "100%",
        width: "100%",
        display: "none",
        '@media (max-width: 1024px)': {
            display: "block"
        },
    },
    containerPadding: {
        paddingTop: "calc((100vh - 476.88px - 53px)/2)",
        '@media (min-width: 1900px)': {
            paddingTop: "calc((100vh - 832.05px - 53px)/2)",
        },
    },
    heroBackground: {
        flex: "0 0 390px",
        '@media (max-width: 1370px)': {
            flex: "0 0 250px",
        },
        '@media (min-width: 1900px)': {
            flex: 0.45
        },
    },
    mainBoxContainer: {
        flex: "0 0 489.12px",
        '@media (max-width: 1370px)': {
            flex: 1
        },
        '@media (min-width: 1900px)': {
            // flex: "0 0 852px",
            flex: 1
        },
    },
    sideNavContainer: {
        flex: 1,
        '@media (min-width: 1900px)': {
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
        '@media (min-width: 1900px)': {
            fontSize: "44px",
            marginBottom: "125px",
            "&:hover": {
                fontSize: "50px",
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
        '@media (min-width: 1900px)': {
            fontSize: "120px",
            marginBottom: "125px",
        },
    },
    stageDefinition: {
        fontSize: "16px",
        maxWidth: "300px",
        lineHeight: "24px",
        fontFamily: "Albra Text Regular",
        paddingRight: "5px",
        '@media (min-width: 1900px)': {
            fontSize: "28px",
            lineHeight: "42px",
            maxWidth: "579.52px"
        },
    },
    stageQuoteMark: {
        marginTop: "80px",
        fontSize: "118px",
        lineHeight: "0px",
        fontFamily: "MADE Soulmaze Outline",
        '@media (min-width: 1900px)': {
            fontSize: "206px",
            marginTop: "128px",
        },
    },
    quoteBox: {
        padding: "50px",
        width: "100%",
        height: "476.88px",
        position: "relative",
        borderRadius: "7px",
        background: "rgba(255,255, 255, 0.1)",
        '@media (min-width: 1900px)': {
            height: "832.05px",
            padding: "80px",

        },
    },
    stageQuote: {
        marginTop: "20px",
        height: "145px",
        paddingRight: "10px",
        overflowY: "scroll",
        maxWidth: "395px",
        fontSize: "16px",
        lineHeight: "26px",
        fontFamily: "Albra Text Regular",
        '@media (min-width: 1900px)': {
            fontSize: "28px",
            lineHeight: "42px",
            maxWidth: "none",
            height: "314px",
            marginTop: "40px",
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
        '@media (min-width: 1900px)': {
            height: "14px",
            width: "14px",
            marginBottom: "15px",
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
        color: "white",
        textDecoration: "none",
        "&:hover": {
            background: "white",
            color: "black",
            textDecoration: "none"
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
        transition: "background 0.5s, color 0.15s",
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
    },
    pillarsX: {
        background: "url('/img/close-icon-black.svg') center / contain no-repeat",
        "&:hover": {
            background: "url('/img/close-icon-blue.svg') center / contain no-repeat",

        }
    },
    buttonShine: {
        background: "linear-gradient(90deg, rgba(107,214,197,0) 40%, rgba(150,150,150,0.7) 49%, rgba(60,190,89,0) 60%)",
        backgroundSize: "300% 300%",
        animation: "backgroundmove2 1.5s infinite",
        backgroundPosition: "left",
        animationTimingFunction: "ease-in-out"
    },
    modernHeader: {
        "&:hover": {
            background: "url('/img/chapter-gradient.png')",
            backgroundSize: "600% 600%",
            animation: "backgroundmove 10s infinite",
            backgroundPosition: "left",
            animationTimingFunction: "ease-in-out",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        }
    },
    imgHoverContainer: {
        fontFamily: "UntitledSans-Medium",
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(0,0,0,0.3)",
        height: "100%",
        width: "100%",
        opacity: 0,
        transition: "0.5s",
        "&:hover": {
            opacity: 1
        }
    },
    imgHover: {
        position: "absolute",
        top: "calc(50% - 15px)",
        left: "calc(50% - 55px)",
        width: "110px",
        padding: "0 15px",
        height: "30px",
        fontSize: "11px",
        borderRadius: "100px",
        lineHeight: "30px",
        letterSpacing: "1px",
        background: "white",
        color: "black"
    },
    playerContainer: {
        padding: "30px",
        paddingLeft: "50px",
        paddingRight: "26px",
        '@media (min-width: 1900px)': {
            padding: "85px",
            paddingRight: "45px",
            paddingBottom: "45px"
        },
    },
    dotsContainer: {
        top: 50,
        right: 40,
        '@media (min-width: 1900px)': {
            top: 85,
            right: 69,
        },
    }
};

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.pillars = PILLARS;

        this.state = {
            textIndex: 0,
            textIndexBot: 0,
            pillars: true,
            stage: STAGES[0],
            stageIndex: 0,
            stageIndexDelayed: 0,
            chapter: true,
            chapterBot: true,
            changingMode: false,

            mobileIndex1: 0,
            mobileIndex2: 0,
            mobileIndex3: 0,

            showInfoModal: true
        }

        this.closeModal = this.closeModal.bind(this);
    }

    setIndex(index) {
        const stage = STAGES[index];
        this.setState({
            changingState: true,
            stageIndex: index,
        });

        $(document).ready(() => {
            console.log($("#mobile-slick").length);
            // $("#mobile-slick").slick('slickGoTo', index);
        });

        setTimeout(() => {

            this.setState({
                stageIndexDelayed: index,

            });

            setTimeout(() => {
                this.setState({
                    stage,
                    changingState: false,
                    textIndex: 0,
                    textIndexBot: 0,
                });
            }, 1);


            // $(document).ready(function(){
            //     $('.quotes-mobile').slick({
            //         arrows: false,
            //     });
            // });
        }, 500);
    }

    setChapterMode(nav) {

        if (this.state.chapterBot) {
            if (nav) {
                this.setState({
                    pillars: nav ? true : false
                });
            }

            return
        }

        dispatcher.dispatch({
            type: "PAUSE-ALL",
        });

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
                pillars: nav ? true : false
            });

            this.startSlick();
        }, 1000);
    }

    setDiscoverMode() {

        if (!this.state.chapterBot) return;

        dispatcher.dispatch({
            type: "PAUSE-ALL",
        });

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

    handleSalesForceSubmit(e) {
        e.preventDefault();

        console.log(e);

        if (this.state.sent) return;

        const form = e.target;
        const data = new FormData(form);

        GlobalStore.track("Pillars", "Submit", "Sign Up");

        fetch('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        }).then((e) => {
            console.log("SS", e);

            this.setState({
                sent: true
            });

            setTimeout(() => {
                this.setState({
                    changeSentText: true
                });
            }, 600);

            setTimeout(() => {
                this.setState({
                    sentBot: true
                });
            }, 750);

            setTimeout(() => {
                this.setState({
                    changeSentText: false
                });
            }, 900);
        })
    }

    closeModal() {
        if (this.state.showInfoModal) {
            this.setState({
                showInfoModal: false
            })
        }
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
                follower.style.top = (event.clientY - 5)+ 'px'
                follower.style.left = (event.clientX - 5) + 'px'
            }, 0)
        }

        GlobalStore.on("pause-all", () => {
            if (!this.state.chapter)
                this.closeModal();
        });

        this.startSlick();
    }

    startSlick() {
        $(document).ready(() => {
            console.log($("#mobile-slick"));
            $("#mobile-slick").slick({
                arrows: false,
                infinite: true,
                slidesToShow: 1,
            }).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
                this.setIndex(nextSlide);
            });
        });
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
        const { changingState, stage, changeText, textIndex, mobileIndex1,  sentBot, sent, changeSentText, } = this.state;

        return (<div className={classes.container} style={{background: STAGES[this.state.stageIndex].gradient, transition: "1s"}}>
            <div className={classes.Desktop}>
                <div id={"custom-cursor"} style={{
                     display: "none", pointerEvents: "none", zIndex: 1000, position: "fixed", height: "20px", width: "20px", border: "3px solid #4e5259", borderRadius: "100%"
                }}/>
                <div style={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden"}}>
                    <div style={{background: "white", flex: "0 0 53px", zIndex: 99, boxShadow: "0px 1px 4px #00000011", overflow: "hidden"}}>
                        <div style={{display: "flex", padding: "0 22px", height: "53px"}}>

                            <div style={{flex: 1, lineHeight: "53px", fontFamily: "GT-America-Mono-Trial-Regular", fontSize: "14px", position: "relative"}}>
                                <span style={{...SANS_SERIF_FONT, fontSize: "14px", marginRight: "8px"}}>A Project by</span><
                                img className={classes.logoImage} onClick={() => {window.open("http://jointempest.com/"); GlobalStore.track("Nav", "Click", "Tempest Logo")}} style={{height: "12px", cursor: "pointer", position: "absolute", top: 21, left: 72, }} src={"/img/tempest-logo.svg"}/>
                                <span style={{...SANS_SERIF_FONT, fontSize: "14px", marginLeft: "68px"}}>|<span style={{marginLeft: "13px", textDecoration: "underline", cursor: "pointer"}} onClick={() => {
                                    this.setChapterMode(true);
                                    GlobalStore.track("Nav", "Click", "What is Modern Recovery?");
                                }}>What is Modern Recovery?</span></span>
                            </div>

                            <div style={{flex: 1, lineHeight: "53px", textAlign: "center", fontFamily: "NoeDisplay Medium", fontSize: "24px", textTransform: "capitalize", letterSpacing: "-0.25px"}}>
                                <span className={classes.modernHeader} style={{cursor: "pointer"}} onClick={() => {this.setDiscoverMode(); GlobalStore.track("Nav", "Click", "Modern Recovery")}}>Modern Recovery</span>
                            </div>

                            <div style={{flex: 1, fontFamily: "Roboto", height: "100%", overflow: "hidden", textAlign: "right", fontSize: "14px"}}>
                                <div style={{display: "inline-block", opacity: this.state.chapterBot ? 0 : 1, transition: "1s", padding: "11px 0", height: "100%", overflow: "hidden"}}>
                                    <div onClick={() => {this.toggleLightDark(); GlobalStore.track("Nav", "Click", this.state.dark ? "Light Mode" : "Dark Mode")}} style={{marginLeft: "16px", textAlign: "left", cursor: "pointer", position: "relative", padding: "6px", display: "inline-block", fontSize: "14px", border: "1px solid", lineHeight: "30px", height: "100%", width: "110px", borderRadius: "15px"}}>
                                        <div style={{display: "inline-block", marginRight: "10px", height: "18px", position: "absolute", left: this.state.darkBot ? 84 : 6, transition: "all 1s", border: "1px solid black", width: "18px", background: this.state.darkBot ? "black" : "#efb83e", borderRadius: "100%"}}>

                                        </div>
                                        <div style={{lineHeight: "30px", fontSize: "14px", ...SANS_SERIF_FONT, position: "absolute", top: 0, right: this.state.dark ? 35 : 15, opacity: this.state.changingDark ? 0 : 1, transition: "opacity 0.5s", display: "inline-block"}}>
                                            <div style={{display: "inline-block",}}>
                                                {this.state.dark ? "Dark" : "Light"} Mode
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div  style={{display: "inline-block", padding: "11px 0", height: "100%", overflow: "hidden"}}>
                                    <div className={classes.buttonShine} onClick={() => {this.toggleChapter(); GlobalStore.track("Nav", "Click", this.state.chapter ? "Discover Mode" : "Chapter Mode")}} style={{background: this.state.chapter ? "none" : null, marginLeft: "16px", textAlign: "left", cursor: "pointer", position: "relative", padding: "6px", display: "inline-block", fontSize: "14px", border: "1px solid", lineHeight: "30px", height: "100%", width: "120px", borderRadius: "15px"}}>
                                        <div style={{display: "inline-block", marginRight: "10px", height: "18px", position: "absolute", left: !this.state.chapterBot ? 94 : 6, transition: "all 1s", border: "1px solid black", width: "18px", background: this.state.chapterBot ? "url('/img/chapter-gradient.png')" : "url('/img/chapter-gradient.png')",
                                            animationName: "backgroundmove",
                                            animationDuration:  this.state.chapter ? "5s" : "10s",
                                            animationDelay: "0",
                                            animationIterationCount: "infinite",
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
                        <div style={{flex: 1, height: "100%", width: "100%", opacity: this.state.mounted ? 1 : 0, transition: "1s", outline: "none"}}>
                            <div style={{display: "flex", height: "100%", width: "100%"}}>
                                <div style={{flex: this.state.pillars ? 0 : 1, transition: "1s", overflow: "hidden", height: "100%"}}>
                                    <div style={{display: "flex", height: "100%", width: "calc(100vw - 46px)"}}>
                                        <div className={classes.heroBackground} style={{transition: "opacity 0.5s", opacity: this.state.changingState ? 0 : 1, background: `url(${STAGES[this.state.stageIndexDelayed].img}) 0% 0% / cover no-repeat`}}>

                                        </div>
                                        <div style={{flex: "1"}}>
                                            <div style={{paddingLeft: "60px", paddingRight: "60px", width: "100%", height: "100%"}}>
                                                <div style={{display: "flex", width: "100%", height: "100%"}}>
                                                    <div className={classes.mainBoxContainer} style={{height: "100%", opacity: this.state.changingState ? 0 : 1, transition: "0.5s"}}>
                                                        <div className={classes.containerPadding}>
                                                            <div className={classes.quoteBox}>
                                                                <div className={classes.dotsContainer} style={{position: "absolute",}}>
                                                                    {this.state.stage.quotes.map((q, i) => {
                                                                        return <div key={"q" + i} style={{opacity: this.state.textIndexBot === i ? 1 : null}} onClick={() => {this.setTextState(i)}} className={classes.dot}/>
                                                                    })}
                                                                </div>
                                                                <div className={classes.stageDefinition}>
                                                                    <span style={{fontFamily: null}}>{this.state.stage.name}:</span> {this.state.stage.definition}
                                                                </div>
                                                                <div className={classes.stageQuoteMark}>
                                                                    “
                                                                </div>
                                                                <div className={`quotes-holder ${classes.stageQuote}`} style={{opacity: this.state.changeText ? 0 : 1, transition: "0.5s"}}>
                                                                    {this.state.stage.quotes[this.state.textIndex].quote ? this.state.stage.quotes[this.state.textIndex].quote : this.state.stage.quotes[this.state.textIndex] }
                                                                    <br/>
                                                                    <span style={{fontFamily: "Albra Text Semi"}}>-{this.state.stage.quotes[this.state.textIndex].author ? this.state.stage.quotes[this.state.textIndex].author : null }</span>
                                                                </div>
                                                                <div className={classes.playerContainer} style={{width: "100%", display: "flex", position: "absolute", bottom: 0, left: 0, }}>
                                                                    <div style={{flex: 1, textAlign: "right"}}>
                                                                        <DesktopChapterPlayer stage={this.state.stage.name} index={this.state.textIndex} audio={this.state.stage.quotes[this.state.textIndexBot].audio ? this.state.stage.quotes[this.state.textIndexBot].audio : "/img/test-audio.m4a"}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className={classes.sideNavContainer} style={{textAlign: "right", overflow: "hidden", height: "100%"}}>
                                                        <div className={classes.containerPadding}>
                                                            {STAGES.map((stage, i) => {
                                                                return (<div key={stage.name} onClick={() => {this.setIndex(i); GlobalStore.track("Chapter", "Click", `${stage.name} Stage`)}} className={this.state.stageIndex === i ? classes.tabBigName : classes.tabName}>{stage.name}</div>);
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
                                        <div className={classes.pillarBar} style={{flex: "0 0 46px", border: this.state.pillars ? "none" : null, background: this.state.pillars ? "white" : null, transition: this.state.pillars ? "1s" : "0.25s", height: "100%"}} onClick={() => {this.setState({pillars: !this.state.pillars}); GlobalStore.track("Chapter", "Click", "What is Modern Recovery?")}}>
                                            <div style={{textAlign: "center"}}>
                                                <div className={classes.pillarsX} style={{width: "16px", height: "17px", transition: "opacity 1s, background 0.25s", opacity: this.state.pillars ? 1 : 0, marginTop: "15px", display: "inline-block", }}/>
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
                                                        <div style={{fontSize: "48px", fontFamily: "NoeDisplay Regular", lineHeight: "60px", marginBottom: "50px"}}>We do recovery <br/>differently.</div>
                                                        <div style={{maxWidth: "400px", ...SANS_SERIF_FONT_BODY, margin: "auto", fontSize: "14px", lineHeight: "24px", }}>
                                                            We’re empowering folks at every stage of their journey to examine their relationship with alcohol— on their own terms. If alcohol is no longer serving you or helping you live the life you want, now’s the time to try something new.
                                                            <br/><br/>
                                                            We hope this movement inspires you to question drinking culture and shed outdated ideas around what it means to be sober or in recovery.
                                                            <br/><br/>
                                                            This is Modern Recovery, and all are welcome.
                                                        </div>
                                                        <div style={{marginTop: "30px"}}>
                                                            <div className={classes.joinButton} onClick={() => {GlobalStore.track("Pillars", "Click", "Join the Movement")}}>
                                                                Join the Movement
                                                            </div>
                                                        </div>
                                                        <div style={{width: "1.5px", height: "102px", background: "white", margin:"auto", marginTop: "25px", marginBottom: "40px"}}>

                                                        </div>
                                                        <div style={{fontSize: "48px", fontFamily: "NoeDisplay Regular", lineHeight: "60px", marginBottom: "10px"}}>Sign Up</div>
                                                        <div className={classes.modernRecoveryText} style={{...SANS_SERIF_FONT_BODY, maxWidth: "320px", margin: "auto", marginBottom: "50px"}}>
                                                            Get involved with Modern Recovery, with stories and resources sent straight to your inbox. You’ll also receive a 15% discount to the Tempest Membership plan of your choice.
                                                        </div>
                                                        <form onSubmit={(e) => this.handleSalesForceSubmit(e)}
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

                                                            <input type="submit" name="submit" value={this.state.sentBot ? "Sent" : "Sign Up"} className={classes.signUpButton}
                                                                   style={{
                                                                       background: this.state.sent ? "linear-gradient(90deg, rgba(107,214,197,0) 30%, rgba(255,255,255,0.7) 49%, rgba(60,190,89,0) 70%) left / 600%" : null,
                                                                       animationName: this.state.sent ? "backgroundmove2" : null,
                                                                       animationDuration: "1.5s",
                                                                       animationDelay: "0",
                                                                       animationTimingFunction: "ease-in-out",
                                                                       color: this.state.changeSentText ? "rgba(0,0,0,0)" : (this.state.sent ? "white" : null),
                                                                       }}
                                                            />

                                                        </form>



                                                        <hr style={{height: "1px", width: "70%", borderTop: "1px dotted white", background: "none", margin:"auto", marginTop: "40px", marginBottom: "40px"}}></hr>
                                                        <div style={{fontSize: "48px", fontFamily: "NoeDisplay Regular", lineHeight: "60px", marginBottom: "10px"}}>Share</div>
                                                        <div style={{...SANS_SERIF_FONT_BODY, maxWidth: "350px", margin: "auto", marginBottom: "50px"}}>
                                                            Let’s write the story of modern recovery together. Tag us at @jointempest and tell us what <span style={{textDecoration: "underline"}}>#modernrecovery</span> means to you, use our new Instagram filter to share your recovery story, and download and share these posts to spread awareness.
                                                        </div>
                                                        <div style={{padding: "0 40px"}}>
                                                            <DesktopSocial {...{classes, chapter: this.state.chapter, pillars: this.state.pillars}}/>
                                                        </div>
                                                        <div style={{marginTop: "50px"}}>
                                                            <a href={"https://draperu.s3.amazonaws.com/public/social+media+assets/Social+Media+Assets.zip"} style={{textDecoration: "none"}} download={true}>
                                                                <div className={classes.joinButton} onClick={() => {GlobalStore.track("Pillars", "Click", "Download All")}}>
                                                                    Download All
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{flex: 1, color: "white", overflow: "scroll", height: "100%"}}>
                                                    <div style={{paddingLeft: "100px", paddingRight: "100px", paddingBottom: "100px", paddingTop: "150px", background: "linear-gradient(#8b99af 20%,#bab8b4 60%)"}}>
                                                        <div style={{marginBottom: "50px", textAlign: "center", fontSize: "48px", lineHeight: "60px", fontFamily: "NoeDisplay Regular"}}>
                                                            What is Modern<br/> Recovery?
                                                        </div>
                                                        <div style={{margin: "auto", fontSize: "14px", ...SANS_SERIF_FONT, marginBottom: "50px", textAlign: "center", maxWidth: "350px", letterSpacing: "-0.25px"}}>
                                                            We have expanded the definition of what it means to be in recovery to include a diverse range of experiences and approaches to care. These six pillars of Modern Recovery encompass our mission to provide a holistic, trauma-informed approach to healing.
                                                        </div>
                                                        {this.pillars.map((pillar, index) => {
                                                            return (
                                                                <div key={"p" + index} style={{maxWidth: "500px", margin: "auto", marginBottom: "70px"}}>
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
                        <div id="canvas-holder" style={{flex: 1, background: this.state.darkBot ? "#272F46" : "#E4D7C4", height: "100%", width: "100%", textAlign: "center", opacity: this.state.mounted ? 1 : 0, transition: "1s",  outline: "none"}}>
                            <Canvas closeModal={this.closeModal} holder="canvas-holder" dark={this.state.darkBot} src={this.state.darkBot ? "/img/mural-dark.jpg" : "/img/mural-light.jpg"}/>
                            <div style={{position: "fixed", top: 77, left: 44, cursor: "pointer", height: "25px", width: "25px"}} onClick={() => {this.setState({showInfoModal: !this.state.showInfoModal}); GlobalStore.track("Discover", "Click", "Information Icon")}}>
                                <img style={{height: "100%", width: "100%", transition: "0.5s"}} src={this.state.darkBot ? "/img/info-icon-white.svg" : "/img/info-icon-black.svg"}/>
                            </div>
                            <div  style={{...SANS_SERIF_FONT_BODY, letterSpacing: "0", display: this.state.showInfoModal ? null : "none", opacity: this.state.showInfoModal ? 1 : 0, transition: "0.5s", padding: "25px", textAlign: "left", fontSize: "12px", background: this.state.darkBot ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)", color: this.state.darkBot ? "black" : "white", position: "fixed", bottom: 53, left: 92, height: "fit-content", width: "300px", boxShadow: "0px 1px 4px #00000011"}}>
                                <div style={{position: "absolute", height: "10px", width: "10px", top: 12, right: 17, cursor: "pointer"}} onClick={() => {this.setState({showInfoModal: false})}}>
                                    <img style={{height: "100%", width: "100%", transition: "0.5s"}} src={this.state.darkBot ? "/img/close-button.png" : "/img/white-x.png"}/>
                                </div>
                                <div style={{fontFamily: "Albra Text Regular", marginTop: "8px", fontSize: "18px"}}>
                                    Exploring the Recovery Journey
                                </div>
                                <div style={{marginTop: "8px"}}>
                                    At Tempest, we believe the recovery process begins the moment we become willing to question our relationship with alcohol. This mural captures a few of the many stories of personal recovery, and the key moments of clarity that occur before we stop drinking. We’re here to celebrate the individuality of recovery, as well as the universal experiences that unite us.
                                </div>
                                <div style={{ marginTop: "8px"}}>
                                    <span style={{fontFamily: "UntitledSans-Bold"}}>Discover:</span> Immerse yourself in these stories by clicking around on the mural.
                                </div>
                                <div style={{ marginTop: "8px"}}>
                                    <span style={{fontFamily: "UntitledSans-Bold"}}>Read:</span> Each section contains a different story from a Tempest member.
                                </div>
                                <div style={{ marginTop: "8px"}}>
                                    <span style={{fontFamily: "UntitledSans-Bold"}}>Listen:</span> Press the play icon to hear audio narratives by our contributors.
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
                                <span style={{cursor: "pointer"}} onClick={() => {this.setDiscoverMode(); GlobalStore.track("Nav", "Click", "Modern Recovery")}}>Modern Recovery</span>
                            </div>
                            <div style={{flex: 1, textAlign: "right", postion: "relative"}}>
                                <div style={{position: "absolute", top: 17, right: 15}}>
                                    {this.state.menu ? <img onClick={() => {this.setState({menu: false})}} style={{height: "15px",}} src={"/img/close-icon-black.svg"}/>
                                        : <div onClick={() => {this.setState({menu: true})}}>
                                            <div style={{height: "2px", width: "18px", background: "black", marginBottom: "4px"}}></div>
                                            <div style={{height: "2px", width: "18px", background: "black", marginBottom: "4px"}}></div>
                                            <div style={{height: "2px", width: "18px", background: "black", marginBottom: "4px"}}></div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                        {this.state.menu &&
                        <div style={{...SANS_SERIF_FONT, fontSize: "14px", lineHeight: "22px", position: "fixed", top: "48px", height: "252px", padding: "36px", width: "100%", background: "white", zIndex: 999, textAlign: "right",}}>
                            <div>
                                <img style={{height: "14px", marginBottom: "18px"}} src={"/img/tempest-logo.svg"}/>
                            </div>
                            <div style={{marginBottom: "36px", maxWidth: "250px", marginLeft: "auto", marginRight: "0px"}}>Modern Recovery is a project by <span style={{textDecoration: "underline" }} onClick={() => {window.open("http://jointempest.com/"); GlobalStore.track("Nav", "Click", "Tempest Logo")}}>Tempest</span> – empowering folks at every stage of their journey through a new interactive campaign.</div>
                            <div onClick={() => {
                                this.setState({menu: false});
                                this.setChapterMode(true);
                            }} style={{fontFamily: "UntitledSans-Medium", textDecoration: "underline"}}>Learn more about Modern Recovery</div>
                        </div>
                        }
                        <div style={{...SANS_SERIF_FONT_BODY, cursor: "pointer", fontSize: "12px", height: "36px", lineHeight: "36px", display: "flex", borderTop: "1px solid black", borderBottom: this.state.pillars ? null : "1px solid black"}}>
                            <div style={{flex: 1, textAlign: "center", background: this.state.chapterBot ? "white" : "black", color: this.state.chapterBot ? "black" : "white" }} onClick={() => {this.setDiscoverMode(); GlobalStore.track("Nav", "Click", "Discover Mode")}}>
                                Discover Mode
                            </div>
                            <div style={{flex: 1, textAlign: "center", background: this.state.chapterBot ? "black" : "white", color: this.state.chapterBot ? "white" : "black"}} onClick={() => {this.setChapterMode(); GlobalStore.track("Nav", "Click", "Chapter Mode")}}>
                                Chapter Mode
                            </div>
                        </div>
                    </div>
                    <div style={{flex: 1, overflow: "hidden"}}>
                        {this.state.chapter ?
                            <div id="mobile-scroll-container" style={{height: "100%", width: "100%", overflowY: "scroll", opacity: this.state.mounted ? 1 : 0, transition: "1s", outline: "none"}}>
                                <div style={{display: "flex", flexDirection: "column", outline: "none"}}>
                                    <div style={{flex: this.state.pillars ? 0 : 1, overflow: this.state.pillars ? "hidden" : null, display: this.state.pillars ? "none" : null}}>
                                        <div style={{height: "fit-content"}}>

                                            <div id={"mobile-slick"} style={{height: "calc((100vh - 84px) * 0.60)", overflow: "hidden"}}>
                                                {STAGES.map((stage, i) => {
                                                    return (<div key={"SSS" + i} style={{transition: "opacity 0.5s", opacity: 1, width: "100%", height: "calc((100vh - 84px) * 0.60)", background: `url(${stage.img}) 0% 0% / cover no-repeat`}}/>);
                                                })}
                                            </div>

                                            {/*<div style={{transition: "opacity 0.5s", opacity: this.state.changingState ? 0 : 1, width: "100%", height: "calc((100vh - 84px) * 0.60)", background: `url(${STAGES[this.state.stageIndexDelayed].img}) 0% 0% / cover no-repeat`}}/>*/}
                                            <div style={{padding: "24px 30px"}}>
                                                <div style={{display: "flex"}}>
                                                    <div onClick={() => {
                                                        let index = this.state.stageIndex - 1;

                                                        if (index < 0) index = STAGES.length - 1;
                                                        if (index > STAGES.length - 1) index = 0;

                                                        $("#mobile-slick").slick('slickGoTo', index);

                                                        this.setIndex(index);

                                                        GlobalStore.track("Chapter", "Click", `${STAGES[index].name} Stage`)

                                                    }} style={{flex: 1, cursor: "pointer"}}>


                                                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17 4.5C17.2761 4.5 17.5 4.27614 17.5 4C17.5 3.72386 17.2761 3.5 17 3.5V4.5ZM0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM17 3.5L1 3.5V4.5L17 4.5V3.5Z" fill="black"/>
                                                        </svg>
                                                    </div>
                                                    <div onClick={() => {
                                                        let index = this.state.stageIndex + 1;

                                                        if (index < 0) index = STAGES.length - 1;
                                                        if (index > STAGES.length - 1) index = 0;

                                                        GlobalStore.track("Chapter", "Click", `${STAGES[index].name} Stage`)
                                                        $("#mobile-slick").slick('slickGoTo', index);
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



                                            <div style={{height: "100px", width: "1px", margin: "auto", background: "black"}} />

                                            <div style={{paddingBottom: "100px"}}>
                                                <MobileQuotes {...{changingState, stage, changeText, textIndex, mobileIndex1, pillars: this.state.pillars, chapter: this.state.chapter}}/>
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

                                                GlobalStore.track("Chapter", "Click", "What is Modern Recovery?");
                                            }}>
                                                <div style={{
                                                    width: "100%",
                                                    position: "relative",
                                                }}>
                                                    <div style={{position: "absolute", left: 18, top: 19}}>
                                                        <img src={"/img/close-icon-black.svg"}
                                                            style={{
                                                                height: "15px",
                                                                width: "15px",
                                                                opacity: this.state.pillars ? 1 : 0
                                                            }}/>
                                                    </div>
                                                </div>
                                                <div style={{width: "fit-content", position: "relative", margin: "auto", paddingLeft: "23px"}}>
                                                    <div style={{
                                                        display: "inline-block",
                                                        height: "15px",
                                                        width: "15px",
                                                        background: this.state.pillars ? "black" : "none",
                                                        borderRadius: "100px",
                                                        marginRight: "7px",
                                                        border: "1px solid",
                                                        position: "absolute",
                                                        left: "0",
                                                        top: "19.5"
                                                    }}/>
                                                    What is Modern Recovery?
                                                </div>

                                            </div>

                                            <div style={{background: "black", paddingTop: this.state.pillars ? "53px" : null,
                                                height: "calc(100vh - 84px)", minHeight: "750px", color: "white", position: "relative"}}>
                                                <div>
                                                    <MobileShare {...{changingState, stage, changeText, textIndex, mobileIndex1, sentBot, sent, changeSentText, classes, handleSalesForceSubmit: this.handleSalesForceSubmit.bind(this), chapter: this.state.chapter, pillars: this.state.pillars}}/>
                                                </div>
                                                <div style={{position: "absolute", left: "calc(50% - 1px)", bottom: 0, height: "25px", background: "white", width: "1px"}}>

                                                </div>

                                            </div>

                                            <div style={{background: "linear-gradient(#8b99af,#bab8b4)", color: "white"}}>
                                                <div style={{height: "25px", background: "white", width: "1px", margin: "auto"}}>

                                                </div>
                                                <div style={{padding: "56px 30px", textAlign: "center"}}>
                                                    <div style={{fontSize: "24px", color: "white", fontFamily: "NoeDisplay Regular", lineHeight: "22px", marginBottom: "24px"}}>
                                                        What is Modern Recovery?
                                                    </div>
                                                    <div style={{...SANS_SERIF_FONT_BODY, fontSize: "14px", maxWidth: "335px", margin: "auto"}}>
                                                        We have expanded the definition of what it means to be in recovery to include a diverse range of experiences and approaches to care. These six pillars of Modern Recovery encompass our mission to provide a holistic, trauma-informed approach to healing.
                                                    </div>
                                                </div>
                                                <div style={{width: "100%", overflow: "hidden",  paddingBottom: "100px"}}>
                                                    <MobilePillars {...{chapter: this.state.chapter, pillars: this.state.pillars }}/>
                                                </div>


                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                            :
                            <div style={{opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                                <div id="canvas-holder-mobile" style={{background: this.state.darkBot ? "#272F46" : "#E4D7C4", height: "100%", width: "100%", textAlign: "center", opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                                    <Canvas closeModal={this.closeModal} holder="canvas-holder-mobile" dark={this.state.darkBot} src={this.state.darkBot ? "/img/mural-dark.jpg" : "/img/mural-light.jpg"}/>
                                </div>
                                <div style={{position: "fixed", top: 100, left: 20, cursor: "pointer", height: "19px", width: "19px"}} onClick={() => {this.setState({showInfoModal: !this.state.showInfoModal}); GlobalStore.track("Discover", "Click", "Information Icon")}}>
                                    <img style={{height: "100%", width: "100%"}} src={this.state.darkBot ? "/img/info-icon-white.svg" : "/img/info-icon-black.svg"}/>
                                </div>
                                <div style={{...SANS_SERIF_FONT_BODY, display: this.state.showInfoModal ? null : "none", transition: "0.5s", padding: "25px", textAlign: "left", fontSize: "11px", background: this.state.darkBot ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)", color: this.state.darkBot ? "black" : "white", position: "fixed", bottom: "calc(50% - 183.5px)", left: "calc( 50% - 150px)", height: "320px", width: "300px", boxShadow: "0px 1px 4px #00000011"}}>
                                    <div style={{position: "absolute", height: "10px", width: "10px", top: 12, right: 17, cursor: "pointer"}} onClick={() => {this.setState({showInfoModal: false})}}>
                                        <img style={{height: "100%", width: "100%"}} src={this.state.darkBot ? "/img/close-button.png" : "/img/white-x.png"}/>
                                    </div>
                                    <div style={{fontFamily: "Albra Text Regular", marginTop: "8px", fontSize: "14px"}}>
                                        Exploring the Recovery Journey
                                    </div>
                                    <div style={{marginTop: "8px"}}>
                                        At Tempest, we believe the recovery process begins the moment we become willing to question our relationship with alcohol. This mural captures a few of the many stories of personal recovery, and the key moments of clarity that occur before we stop drinking. We’re here to celebrate the individuality of recovery, as well as the universal experiences that unite us.
                                    </div>
                                    <div style={{ marginTop: "8px"}}>
                                        <span style={{fontFamily: "UntitledSans-Bold"}}>Discover:</span> Immerse yourself in these stories by clicking around on the mural.
                                    </div>
                                    <div style={{ marginTop: "8px"}}>
                                        <span style={{fontFamily: "UntitledSans-Bold"}}>Read:</span> Each section contains a different story from a Tempest member.
                                    </div>
                                    <div style={{ marginTop: "8px"}}>
                                        <span style={{fontFamily: "UntitledSans-Bold"}}>Listen:</span> Press the play icon to hear audio narratives by our contributors.
                                    </div>
                                </div>
                                <div style={{position: "fixed", bottom: "0", left: "0", width: "100%", height: "36px",}}>
                                    <div style={{...SANS_SERIF_FONT_BODY, cursor: "pointer", fontSize: "12px", height: "36px", lineHeight: "36px", display: "flex", borderTop: "1px solid black"}}>
                                        <div style={{flex: 1, textAlign: "center", background: this.state.darkBot ? "white" : "black", color: this.state.darkBot ? "black" : "white" }} onClick={() => {this.toggleLightDark(false); GlobalStore.track("Nav", "Click", "Light Mode")}}>
                                            Light Mode
                                        </div>
                                        <div style={{flex: 1, textAlign: "center", background: this.state.darkBot ? "black" : "white", color: this.state.darkBot ? "white" : "black"}} onClick={() => {this.toggleLightDark(true); GlobalStore.track("Nav", "Click", "Dark Mode")}}>
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
