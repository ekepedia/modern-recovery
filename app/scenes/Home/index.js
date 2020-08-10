import React from "react";

import injectSheet from 'react-jss';
import { withRouter, Link } from 'react-router-dom';

import { STAGES } from "./copy";

const Styles = {
    container: {
    },
    tabName: {
        fontFamily: "Casta Regular",
        fontSize: "25px",
        lineHeight: "17px",
        marginBottom: "calc(100vh/9)",
        cursor: "pointer",
        transition: "0.25s",
        "&:hover": {
            fontSize: "30px",
        }
    },
    tabBigName: {
        fontFamily: "Casta Regular",
        fontSize: "100px",
        lineHeight: "64px",
        marginBottom: "calc(100vh/9)",
        cursor: "pointer",
        transition: "0.25s",
        "&:hover": {
            fontSize: "105px",
        }
    },
    dot: {
        height: "11px",
        width: "11px",
        borderRadius: "100%",
        background: "#a6a096",
        marginRight: "12px",
        display: "inline-block",
        cursor: "pointer",
        opacity: 1,
        transition: "0.5s",
        "&:hover": {
            opacity: "0.5",
        }
    },
    pillarBar: {
        borderLeft: "1px solid",
        position: "relative",
        cursor: "pointer"
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

        this.texts = [
            "1: One night out, I saw a lady my age guzzling beer one after another, and it hit me that I do that with wine at home, but out at a bar, I'd drink \"respectably\" slower, then go home and guzzle.  Seeing her that night, I saw myself and thought yuck, this isn't pretty.",
            "2: One night out, I saw a lady my age guzzling beer one after another, and it hit me that I do that with wine at home, but out at a bar, I'd drink \"respectably\" slower, then go home and guzzle.  Seeing her that night, I saw myself and thought yuck, this isn't pretty.",
            "3: One night out, I saw a lady my age guzzling beer one after another, and it hit me that I do that with wine at home, but out at a bar, I'd drink \"respectably\" slower, then go home and guzzle.  Seeing her that night, I saw myself and thought yuck, this isn't pretty.",
            "4: One night out, I saw a lady my age guzzling beer one after another, and it hit me that I do that with wine at home, but out at a bar, I'd drink \"respectably\" slower, then go home and guzzle.  Seeing her that night, I saw myself and thought yuck, this isn't pretty."
        ]

        this.pillars = [
            1,2,3,4
        ]

        this.state = {
            textIndex: 0,
            textIndexBot: 0,
            pillars: false,
            stage: STAGES[0],
            stageIndex: 0,
            chapter: true
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
        });
        setTimeout(() => {
            this.setState({
                chapter: !this.state.chapter,
                mounted: true,
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
            <div style={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden"}}>
                <div style={{background: "white", flex: "0 0 53px"}}>
                    <div style={{display: "flex", padding: "0 22px"}}>

                        <div style={{flex: 1, lineHeight: "53px", fontFamily: "GT-America-Mono-Trial-Regular", fontSize: "15px", position: "relative"}}>
                            <span style={{fontFamily: "NoeDisplay Regular", marginRight: "50px", fontSize: "18px"}}>A Project By Tempest</span><div style={{height: "30px", marginLeft: "10px", left: "160px", marginRight: "30px", position: "absolute", top: "10", width: "1px", paddingTop: "0", display: "inline-block"}}><div style={{background: "black", width: "100%", height: "100%"}}></div></div>#modernrecovery
                        </div>
                        <div style={{flex: 1, lineHeight: "53px", textAlign: "center", fontFamily: "NoeDisplay Medium", fontSize: "24px", textTransform: "capitalize", letterSpacing: "-0.25px"}}>
                            Modern Recovery
                        </div>

                        <div style={{flex: 1, fontFamily: "Roboto", textAlign: "right", fontSize: "18px"}}>
                            <div style={{display: "inline-block", lineHeight: "53px", fontFamily: "NoeDisplay Regular"}}>
                                {this.state.chapter ? "Chapter" : "Discover"} Mode
                            </div>
                            <div onClick={() => {this.toggleChapter()}} style={{marginLeft: "8px", textAlign: "left", cursor: "pointer", position: "relative", padding: "4px 6px", display: "inline-block", fontSize: "14px", border: "1px solid", lineHeight: "30px", height: "30px", width: "60px", borderRadius: "15px"}}>
                                <div style={{display: "inline-block", marginRight: "10px", height: "18px", width: "18px", background: this.state.chapter ? "#7dc49b" : "#7dc49b", borderRadius: "100%"}}>

                                </div>
                                <div style={{lineHeight: "22px", fontSize: "16px", fontFamily: "GT-America-Mono-Trial-Regular", position: "absolute", top: 2, right: 9, display: "inline-block"}}>
                                    {this.state.chapter ? "On" : "On"}
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
                                    <div style={{flex: "0 0 390px", transition: "background 0.5s", background: `url(${STAGES[this.state.stageIndex].img})`}}>

                                    </div>
                                    <div style={{flex: "1"}}>
                                        <div style={{paddingLeft: "100px", paddingRight: "60px", width: "100%", height: "100%"}}>
                                            <div style={{display: "flex", width: "100%", height: "100%"}}>
                                                <div style={{flex: "0 0 300px", height: "100%", opacity: this.state.changingState ? 0 : 1, transition: "0.5s"}}>
                                                    <div style={{paddingTop: "100px"}}>
                                                        <div style={{fontSize: "16px", maxWidth: "317px", lineHeight: "24px", fontFamily: "GT-America-Mono-Trial-Regular-Italic"}}>
                                                            <span style={{textDecoration: "underline"}}>{this.state.stage.name}</span> {this.state.stage.definition}
                                                        </div>
                                                        <div style={{paddingLeft: "35px", height: "410px", marginTop: "30px", position: "relative", paddingTop: "30px", paddingBottom: "25px", paddingRight: "25px", borderRadius: "7px", background: "rgba(255,255, 255, 0.1)"}}>
                                                            <div style={{marginTop: "40px", fontSize: "118px", lineHeight: "0px", fontFamily: "MADE Soulmaze Outline"}}>
                                                                “
                                                            </div>
                                                            <div style={{marginTop: "30px", maxWidth: "240px", fontSize: "18px", lineHeight: "26px", fontFamily: "Albra Text Regular", opacity: this.state.changeText ? 0 : 1, transition: "0.5s"}}>
                                                                {this.state.stage.quotes[this.state.textIndex]}
                                                            </div>
                                                            <div style={{marginTop: "30px", position: "absolute", width: "100%", bottom: "35px", left: "35px"}}>
                                                                <div style={{display: "inline-block"}}>
                                                                    {this.state.stage.quotes.map((q, i) => {
                                                                        return <div key={i} style={{background: this.state.textIndexBot === i ? "black" : null}} onClick={() => {this.setTextState(i)}} className={classes.dot}/>
                                                                    })}
                                                                </div>
                                                                <div style={{position: "absolute", cursor:"pointer", height: "36px", lineHeight: "36px", textAlign: "center", width: "36px", background: "#e4e0d9", bottom: "-15px", right: "61px", borderRadius: "100%"}}>
                                                                    <img src={"/img/play.png"} style={{display: "inline-block", marginTop: "11px"}}>

                                                                    </img>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div style={{flex: 1, textAlign: "right", overflow: "hidden", height: "100%"}}>
                                                    <div style={{paddingTop: "63px"}}>
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
                                    <div className={classes.pillarBar} style={{flex: "0 0 46px", border: this.state.pillars ? "none" : null, background: this.state.pillars ? "white" : "none", transition: "1s", height: "100%"}} onClick={() => {this.setState({pillars: !this.state.pillars})}}>
                                        <div style={{textAlign: "center"}}>
                                            <img src={"/img/close-button.png"} style={{width: "16px", transition: "1s", opacity: this.state.pillars ? 1 : 0, marginTop: "15px", display: "inline-block"}}/>
                                        </div>
                                        <div style={{transform: "rotate(-90deg)",
                                            margin: "auto",
                                            position: "absolute",
                                            fontSize: "18px",
                                            top: "50%",
                                            fontFamily:"NoeDisplay Regular",
                                            width: "120px",
                                            left: "-35px"}}>
                                            <div style={{
                                                display: "inline-block",
                                                height: "15px",
                                                width: "15px",
                                                background: this.state.pillars ? "black" : "none",
                                                transition: "1s",
                                                borderRadius: "100%",
                                                marginRight: "10px",
                                                border: "1px solid"
                                            }}/>
                                            The Pillars
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
                        <div style={{padding: "50px", height: "100%", width: "100%", background: "linear-gradient(#8693a7,#ccbeae)"}}>
                            <img src={"https://media.agoodson.com/wp-content/uploads/2018/11/ICON-map.png"} style={{display: "inline-block", margin: "auto", height: "100%"}} />
                        </div>
                    </div>
                }
            </div>
        </div>);
    }

}

export default withRouter(injectSheet(Styles)(Home))