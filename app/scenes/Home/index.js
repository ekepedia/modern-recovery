import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

import { STAGES } from "./copy";

const Styles = {
    container: {
        cursor: "auto"
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
    playButton: {
        background: "#e4e0d9",
        transition: "all 0.25s",
        "&:hover": {
            background: "black",
        },
    },
    playButtonContainer: {
        background: "url('/img/play.png') center no-repeat",
        transition: "all 0.25s",

        "&:hover": {
            background: "url('/img/play-white.png') center no-repeat",
        },
    },
    joinButton: {
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: "12px",
        height: "45px",
        lineHeight: "45px",
        border: "1px solid white",
        borderRadius:"23px",
        width: "166px",
        margin: "auto",
        cursor: "pointer",
        transition: "0.5s",
        "&:hover": {
            background: "white",
            color: "black"
        }
    }
};

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.pillars = [1,2,3,4]

        this.state = {
            textIndex: 0,
            textIndexBot: 0,
            pillars: false,
            stage: STAGES[0],
            stageIndex: 0,
            chapter: true,
            chapterBot: true,
            changingMode: false
        }
    }

    setIndex(index) {
        const stage = STAGES[index];
        this.setState({
            changingState: true,
            stageIndex: index,
        })

        setTimeout(() => {
            this.setState({
                stage,
                changingState: false,
                textIndex: 0,
                textIndexBot: 0,
            })
        }, 500);
    }

    toggleChapter() {
        this.setState({
            mounted: false,
            chapterBot: !this.state.chapterBot,
            changingMode: true,
        });
        setTimeout(() => {
            this.setState({
                chapter: !this.state.chapter,
                mounted: true,
                changingMode: false
            })
        }, 1000);
    }

    toggleLightDark() {
        this.setState({
            darkBot: !this.state.darkBot,
            changingDark: true,
        });
        setTimeout(() => {
            this.setState({
                dark: !this.state.dark,
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
            console.log(event);
            setTimeout(() => {
                let follower = document.getElementById('custom-cursor');
                follower.style.display = "block";
                follower.style.top = (event.clientY - 25)+ 'px'
                follower.style.left = (event.clientX -25) + 'px'
            }, 0)
        }
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

        return (<div className={classes.container} style={{background: "linear-gradient(#66a1b6,#ccbeae)", transition: "1s"}}>
            <div id={"custom-cursor"} style={{opacity: 0.5, display: "none", pointerEvents: "none", zIndex: 1000, position: "fixed", height: "50px", width: "50px", background: "grey", borderRadius: "100%"}}></div>
            <div style={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden"}}>
                <div style={{background: "white", flex: "0 0 53px", overflow: "hidden"}}>
                    <div style={{display: "flex", padding: "0 22px", height: "100%"}}>

                        <div style={{flex: 1, lineHeight: "53px", fontFamily: "GT-America-Mono-Trial-Regular", fontSize: "14px", position: "relative"}}>
                            <span style={{fontFamily: "NoeDisplay Regular", marginRight: "26px", fontSize: "14px"}}>A Project By Tempest</span><div style={{height: "22px", left: "136px", marginRight: "30px", position: "absolute", top: "15", width: "1px", paddingTop: "0", display: "inline-block"}}><div style={{background: "black", width: "100%", height: "100%"}}></div></div>#modernrecovery
                        </div>

                        <div style={{flex: 1, lineHeight: "53px", textAlign: "center", fontFamily: "NoeDisplay Medium", fontSize: "24px", textTransform: "capitalize", letterSpacing: "-0.25px"}}>
                            Modern Recovery
                        </div>

                        <div style={{flex: 1, fontFamily: "Roboto", height: "100%", overflow: "hidden", textAlign: "right", fontSize: "14px"}}>
                            <div style={{display: "inline-block", opacity: this.state.chapterBot ? 0 : 1, transition: "1s", padding: "11px 0", height: "100%", overflow: "hidden"}}>
                                <div onClick={() => {this.toggleLightDark()}} style={{marginLeft: "16px", textAlign: "left", cursor: "pointer", position: "relative", padding: "5.5px 6px", display: "inline-block", fontSize: "14px", border: "1px solid", lineHeight: "30px", height: "100%", width: "100px", borderRadius: "15px"}}>
                                    <div style={{display: "inline-block", marginRight: "10px", height: "18px", position: "absolute", left: this.state.darkBot ? 76 : 6, transition: "all 1s", border: "1px solid black", width: "18px", background: this.state.darkBot ? "black" : "white", borderRadius: "100%"}}>

                                    </div>
                                    <div style={{lineHeight: "30px", fontSize: "12px", fontFamily: "DomaineDisplayTest-MediumItalic", position: "absolute", top: 0, right: this.state.dark ? 30 : 10, opacity: this.state.changingDark ? 0 : 1, transition: "opacity 0.5s", display: "inline-block"}}>
                                        <div style={{display: "inline-block", overflow: "hidden"}}>
                                            {this.state.dark ? "Dark" : "Light"} Mode
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{display: "inline-block", padding: "11px 0", height: "100%", overflow: "hidden"}}>
                                <div onClick={() => {this.toggleChapter()}} style={{marginLeft: "16px", textAlign: "left", cursor: "pointer", position: "relative", padding: "5.5px 6px", display: "inline-block", fontSize: "14px", border: "1px solid", lineHeight: "30px", height: "100%", width: "120px", borderRadius: "15px"}}>
                                    <div style={{display: "inline-block", marginRight: "10px", height: "18px", position: "absolute", left: this.state.chapterBot ? 96 : 6, transition: "all 1s", border: "1px solid black", width: "18px", background: this.state.chapter ? "#7dc49b" : "#7dc49b", borderRadius: "100%"}}>

                                    </div>
                                    <div style={{lineHeight: "30px", fontSize: "12px", fontFamily: "DomaineDisplayTest-MediumItalic", position: "absolute", top: 0, right: this.state.chapter ? 35 : 10, opacity: this.state.changingMode ? 0 : 1, transition: "opacity 0.5s", display: "inline-block"}}>
                                        <div style={{display: "inline-block", overflow: "hidden"}}>
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
                                                                    return <div key={i} style={{opacity: this.state.textIndexBot === i ? 1 : null}} onClick={() => {this.setTextState(i)}} className={classes.dot}/>
                                                                })}
                                                            </div>
                                                            <div style={{fontSize: "15px", maxWidth: "300px", lineHeight: "24px", fontFamily: "DomaineDisplayTest-MediumItalic"}}>
                                                                <span style={{textDecoration: ""}}>{this.state.stage.name}</span> {this.state.stage.definition}
                                                            </div>
                                                            <div style={{marginTop: "80px", fontSize: "118px", lineHeight: "0px", fontFamily: "MADE Soulmaze Outline"}}>
                                                                “
                                                            </div>
                                                            <div style={{marginTop: "20px", height: "150px", overflow: "scroll", maxWidth: "395px", fontSize: "16px", lineHeight: "26px", fontFamily: "Albra Text Regular", opacity: this.state.changeText ? 0 : 1, transition: "0.5s"}}>
                                                                {this.state.stage.quotes[this.state.textIndex]}
                                                            </div>
                                                            <div style={{width: "100%", display: "flex", position: "absolute", bottom: 0, left: 0, padding: "50px", paddingRight: "26px"}}>
                                                                <div style={{flex: 1, textAlign: "right"}}>
                                                                    <div className={classes.playButton} style={{ display: "inline-block", cursor:"pointer", height: "36px", lineHeight: "36px", textAlign: "center", width: "36px", borderRadius: "100%"}}>
                                                                        <div className={classes.playButtonContainer} style={{display: "inline-block", height: "100%", width: "100%"}}>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div style={{flex: 1, textAlign: "right", overflow: "hidden", height: "100%"}}>
                                                    <div style={{paddingTop: "calc((100vh - 476.88px - 53px)/2)"}}>
                                                        {STAGES.map((stage, i) => {
                                                            return (<div onClick={() => {this.setIndex(i)}} className={this.state.stageIndex === i ? classes.tabBigName : classes.tabName}>{stage.name}</div>);
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
                                            fontSize: "16px",
                                            top: "calc((100vh - 53px)/2 + 80px - 225px/2)",
                                            fontFamily:"NoeDisplay Regular",
                                            width: "225px",
                                            left: "-88.5"}}>
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
                                            <div style={{flex: 1, background: "black", color: "white", textAlign: "center", height: "100%"}}>
                                                <div style={{paddingTop: "150px"}}>
                                                    <div style={{fontSize: "40px", fontFamily: "Casta Regular"}}>What is Modern Recovery?</div>
                                                    <div style={{maxWidth: "415px", margin: "auto", marginTop: "20px", fontSize: "16px", lineHeight: "24px", fontFamily: "Albra Text Regular"}}>
                                                        Modern Recovery isn’t a linear path. Looking inward, examining the reasons why we drink, and breaking the cycle of addiction is a profoundly personal process. We all take different routes, yet we’re on the same journey. At Tempest, we celebrate both the individuality of recovery, as well as the universal experiences that unite us.<br/>
                                                        <br/>
                                                        We believe you should be at the center of your own healing. We believe that you should be empowered to write your own story. And we believe that it’s more than just quitting alcohol—it’s about gaining back your life.
                                                    </div>
                                                    <div style={{marginTop: "30px"}}>
                                                        <div className={classes.joinButton}>
                                                            Join the Conversation
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{flex: 1, color: "white", overflow: "scroll", height: "100%"}}>
                                                <div style={{paddingLeft: "140px", paddingBottom: "100px", paddingTop: "150px", background: "linear-gradient(#8693a7,#ccbeae)"}}>
                                                    <div style={{marginBottom: "60px", fontSize: "40px", lineHeight: "40px", fontFamily: "Casta Regular"}}>
                                                        The Pillars of<br/>
                                                        Modern Recovery
                                                    </div>
                                                    {this.pillars.map((pillar) => {
                                                        return (
                                                            <div key={pillar} style={{marginBottom: "70px"}}>
                                                                <div style={{display: "flex"}}>
                                                                    <div style={{flex: "0 0 140px"}}>
                                                                        <div style={{fontSize: "60px", lineHeight: "60px", fontFamily: "Casta Regular"}}>
                                                                            <div style={{height: "112px", lineHeight: "112px", textAlign: "center", width: "112px", border: "2px solid white", borderRadius: "100%"}}>
                                                                                0{pillar}.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{flex: 1}}>
                                                                        <div style={{fontFamily: "Albra Text Regular", maxWidth: "290px", fontSize: "16px", lineHeight: "20px"}}>
                                                                            Modern Recovery is for everyone. No matter where you are on your journey—if you want to quit drinking, you have some time sober, or you’re just reevaluating your relationship with alcohol—there’s a place for you.
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
                    <div style={{flex: 1, height: "100%", width: "100%", textAlign: "center", opacity: this.state.mounted ? 1 : 0, transition: "1s"}}>
                        <div style={{padding: "50px", height: "100%", width: "100%", transition: "1s", background: this.state.darkBot ? "url('img/IMG_1557.JPG') 0% 0% / cover no-repeat" :"url('https://i.imgur.com/lGumm9N.jpg') 0% 0% / cover no-repeat",}}>
                        </div>
                    </div>
                }
            </div>
        </div>);
    }

}

export default withRouter(injectSheet(Styles)(Home))
