/**
 * IMPORTS
 */
import React from 'react';
import Steps from './Steps';
import Timer from './Timer';


/**
 * CONSTANTS AND DEFINITIONS
 */

// steps names
const SHORT_BREAK = 'shortBreak';
const LONG_BREAK = 'longBreak';
const POMODORO = 'pomodoro';

// cicle of steps to follow
const CICLE = [
    POMODORO,
    SHORT_BREAK,
    POMODORO,
    SHORT_BREAK,
    POMODORO,
    SHORT_BREAK,
    POMODORO,
    LONG_BREAK
];

// I convert a step name into a string to be displayed to the user
const DISPLAY_NAMES = new Map();
DISPLAY_NAMES.set(POMODORO, 'Pomodoro');
DISPLAY_NAMES.set(LONG_BREAK, 'Long break');
DISPLAY_NAMES.set(SHORT_BREAK, 'Short break');

// I define the duration of each step
const DURATIONS = new Map();
DURATIONS.set(SHORT_BREAK,
              {
                  hours: 0,
                  minutes: 5,
                  seconds: 0
              });
DURATIONS.set(LONG_BREAK,
              {
                  hours: 0,
                  minutes: 15,
                  seconds: 0
              });
DURATIONS.set(POMODORO,
              {
                  hours: 0,
                  minutes: 25,
                  seconds: 0
              });


/**
 * CODE
 */
class Pomodoro extends React.Component
{
    // FIXME: destruct the props.
    //
    /**
     * I initialize myself.
     *
     * :param props: component properties
     * :type  props: object
     */
    constructor(props)
    {
        super(props);

        // set initial state
        this.state = {
            step: 0,
            hours: DURATIONS.get(CICLE[0]).hours,
            minutes: DURATIONS.get(CICLE[0]).minutes,
            seconds: DURATIONS.get(CICLE[0]).seconds,
            // FIXME: remove this from state. No need to update the component
            // if this changes.
            tensOfSeconds: 0
        };

        // date marking the last time the timer as updated
        this.lastUpdated = null;

        // a 'null' interval means there's no timer running
        this.interval = null;

        // audio object used to notify the user the end of a step
        this.audio = new Audio(
            require('../assets/audio/352666__foolboymedia__up-chime-2.mp3')
        );
    }


    /**
     * I handle the 'stop' button click.
     *
     * :returns: nothing
     * :rtype: undefined
     */
    onStopClick ()
    {
        clearInterval(this.interval);
        this.interval = null;
        this.lastUpdated = null;
    }


    /**
     * I handle the 'start' button click.
     *
     * :returns: nothing
     * :rtype: undefined
     */
    onStartClick ()
    {
        // timer already running: return
        if (this.interval !== null)
        {
            return;
        }

        // timer not yet running: start it and update it every 100 milliseconds
        this.interval = setInterval(() =>
        {
            // get current date
            const current = new Date();

            // initialize time elapsed (in seconds) since last update
            let elapsed;

            // timer was not updated before: time elapsed is zero
            if (this.lastUpdated === null)
                elapsed = 0;

            // timer was updated before: time elapsed is the time since last
            // update
            else
                elapsed = (current - this.lastUpdated) / 1000;

            // update the date of the last timer update
            this.lastUpdated = current;

            // get the time displayed in the timer in seconds
            const oldSeconds = this.state.hours * 3600 + this.state.minutes * 60 + this.state.seconds;

            // get the updated time of the timer in seconds
            const newSeconds = Math.max(oldSeconds - elapsed, 0);

            // timer complete: update step and return
            if (Math.round(newSeconds) === 0)
            {
                this.onTimerCompleted();
                return
            }

            // update timer
            this.setState({
                hours: Math.floor(newSeconds / 3600),
                minutes: Math.floor((newSeconds % 3600) / 60),
                seconds: newSeconds % 60
            });
        }, 100);
    }


    /**
     * I update the state when the timer is completed.
     *
     * :returns: nothing
     * :rtype: undefined
     */
    onTimerCompleted ()
    {
        // emit sound alert
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();

        // display notification
        new Notification(`The ${CICLE[this.state.step]} is over`);

        // cancel the current interval
        clearInterval(this.interval);
        this.interval = null;
        this.lastUpdated = null;

        // all steps are over: go to first step and return
        if (this.state.step + 1 === CICLE.length)
        {
            this.setState({
                step: 0,
                hours: DURATIONS.get(CICLE[0]).hours,
                minutes: DURATIONS.get(CICLE[0]).minutes,
                seconds: DURATIONS.get(CICLE[0]).seconds,
                tensOfSeconds: 0
            });
            return;
        }

        // not all steps are over: go to the next one
        this.setState({
            step: this.state.step + 1,
            hours: DURATIONS.get(CICLE[this.state.step + 1]).hours,
            minutes: DURATIONS.get(CICLE[this.state.step + 1]).minutes,
            seconds: DURATIONS.get(CICLE[this.state.step + 1]).seconds,
            tensOfSeconds: 0
        });
    }


    /**
     * I handle the 'reset' button click.
     *
     * :returns: nothing
     * :rtype: undefined
     */
    onResetClick ()
    {
        // cancel current interval
        clearInterval(this.interval);
        this.interval = null;

        // go back to the beginning of the first step
        this.setState({
            step: 0,
            hours: DURATIONS.get(CICLE[0]).hours,
            minutes: DURATIONS.get(CICLE[0]).minutes,
            seconds: DURATIONS.get(CICLE[0]).seconds,
            tensOfSeconds: 0
        });
    }


    /**
     * I render this component.
     *
     * :returns: content to be rendered.
     * :rtype: React.ReactNode
     */
    render ()
    {
        return (
            <div>
                <Steps
                    cicle={CICLE.map((x) => DISPLAY_NAMES.get(x))}
                    step={this.state.step}
                />
                <Timer
                    hours={this.state.hours}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    tensOfSeconds={this.state.tensOfSeconds}
                    onStartClick={() => {this.onStartClick()}}
                    onStopClick={() => {this.onStopClick()}}
                    onResetClick={() => {this.onResetClick()}}
                />
            </div>
        );
    }
}


/**
 * EXPORTS
 */
export default Pomodoro;
