import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function SecondHand(props){
    let style = {
        backgroundColor: 'red',
        width: '3px',
        height: '246px',
        position: 'absolute',
        border: '1px solid black',
        borderRadius: '2px',
        transform: 'translate(0, -123px) rotate(' + props.angle + 'deg)',
        transformOrigin: '2px 100%'
    };

    return (
        <div id='second-hand-container'>
            <div style={style}></div>
            <div id='second-hand-pivot'></div>
        </div>
    )
}

function MinuteHand(props){
    let style = {
        backgroundColor: '#ddd',
        width: '11px',
        height: '230px',
        border: '1px solid black',
        borderRadius: '6px',
        transform: 'translate(0, -115px) rotate(' + props.angle + 'deg)',
        transformOrigin: '6px 100%'
    };

    return (
        <div id='minute-hand-container'>
            <div style={style}></div>
            <div id='minute-hand-pivot'></div>
        </div>
    )
}

function HourHand(props){
    let style = {
        backgroundColor: '#ddd',
        width: '11px',
        border: '1px solid black',
        height: '150px',
        borderRadius: '6px',
        transform: 'translate(0, -75px) rotate(' + props.angle + 'deg)',
        transformOrigin: '6px 100%'
    };

    return (
        <div id='hour-hand-container'>
            <div style={style}></div>
        </div>
    )
}

function Dial(props){
    let outerMarkers = [];
    for(let i = 0; i < 60; i++){
        let angle = i * 360 / 60;
        let length = 19;
        if(!(i%5)){
            length = 38;
        }
        let style = {
            backgroundColor: '#ddd',
            width: '5px',
            height: length,
            position: 'absolute',
            borderRadius: '6px',
            transform: 'rotate(' + angle + 'deg) translate(0, ' + (270 - length / 2) + 'px)',
        }

        outerMarkers.push(<div key={i} style={style}></div>);
    }

    let minutes = [];
    for(let i = 1; i < 12; ++i)
    {
        let angle = i * 360 / 12;
        let style = {
            color: '#ddd',
            fontFamily: 'serif',
            fontSize: '22pt',
            fontWeight: 'bold',
            position: 'absolute',
            transform: 'rotate(' + angle + 'deg) translate(0, -210px) rotate(' + -angle + 'deg)'
        };

        minutes.push(<div key={i} style={style}>{i*5}</div>);
    }

    let innerMarkers = [];
    for(let i = 0; i < 60; i++){
        let angle = i * 360 / 12;

        let style = {
            backgroundColor: '#ddd',
            width: '5px',
            height: '10px',
            position: 'absolute',
            borderRadius: '6px',
            transform: 'rotate(' + angle + 'deg) translate(0, 160px)',
        }

        innerMarkers.push(<div key={i} style={style}></div>);
    }

    let hours = [];
    for(let i = 1; i < 13; ++i)
    {
        let angle = i * 360 / 12;
        let style = {
            color: '#ddd',
            fontFamily: 'serif',
            fontSize: '18pt',
            fontWeight: 'bold',
            position: 'absolute',
            transform: 'rotate(' + angle + 'deg) translate(0, -130px) rotate(' + -angle + 'deg)'
        };

        hours.push(<div key={i} style={style}>{i}</div>);
    }

    return (
        <div id='dial-container'>
            <svg width='40' height='40' viewBox='0 0 10 10' style={{position: 'absolute', transform: 'translate(0, -210px)'}}>
                <polygon points='0, 10 10, 10 5, 1' fill="#ddd"/>
            </svg>
            <div style={{width: '320px', height: '320px', position: 'absolute', border: '4px solid white', borderRadius: '100%'}}></div>
            {hours}
            {outerMarkers}
            {minutes}
        </div>
    );
}

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time: 1
        }

        this.updateTime = this.updateTime.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    setTime(){
        let date = new Date();
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hours = date.getHours();

        let time = seconds * 8 + minutes * 480 + hours * 28800;
        this.setState({time: time});
    }

    componentDidMount(){
        this.interval = setInterval(this.updateTime, 125);
        this.setTime();
        document.addEventListener('visibilitychange', this.setTime);
    }

    updateTime(){
        this.setState({time: this.state.time + 1});
    }

    render(){
        return (
            <div>
                <div id="clock-container">
                    <Dial/>
                    <HourHand angle={this.state.time * 360 / 345600}/>
                    <MinuteHand angle={this.state.time * 360 / 28800}/>
                    <SecondHand angle={this.state.time * 360 / 480}/>
                </div>
            </div>
        );
    }
}

class App extends React.Component{
    render(){
        return (
            <div id='main-div'>
                <Clock/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
