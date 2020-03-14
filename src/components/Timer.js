/**
 * IMPORTS
 */
import React from 'react';


/**
 * CODE
 */
class Timer extends React.Component
{
    /**
     * I format the timer values to a human-readable format with two digits for
     * hours, minutes and seconds.
     */
    formatTime ()
    {
        const hours = ('0' + this.props.hours).slice(-2);
        const minutes = ('0' + this.props.minutes).slice(-2);
        const seconds = ('0' + this.props.seconds).slice(-2);

        return `${hours}:${minutes}:${seconds}`;
    }


    /**
     * I format a unit of time (e.g. hours, minutes, seconds) to a printable
     * string with two digits.
     *
     * :param unit: the unit of time to be formatted
     * :type  unit: number
     *
     * :returns: the formated unit of time
     * :rtype: string
     */
    formatTimeUnit (unit)
    {
        return ('0' + Math.floor(unit).toString()).slice(-2)
    }


    /**
     * I handle the 'start' button click.
     */
    onStartClick ()
    {
        this.props.onStartClick();
    }


    /**
     * I handle the 'stop' button click.
     */
    onStopClick ()
    {
        this.props.onStopClick();
    }


    /**
     * I handle the 'reset' button click.
     */
    onResetClick ()
    {
        this.props.onResetClick();
    }


    /**
     * I render this component
     */
    render()
    {
        return (
            <div className="container text-center">
                <div className="display-3 m-5">
                    {this.formatTime()}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="btn-group col-sm-12">
                            <button
                                type="button"
                                className="btn btn-secondary col-md-4"
                                onClick={() => {this.onStartClick()}}
                            >
                                Start
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary col-md-4"
                                onClick={() => {this.onStopClick()}}
                            >
                                Stop
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary col-md-4"
                                onClick={() => {this.onResetClick()}}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


/**
 * EXPORTS
 */
export default Timer;
