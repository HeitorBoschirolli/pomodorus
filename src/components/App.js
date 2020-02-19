/**
 * IMPORTS
 */
import React from 'react';
import Pomodoro from './Pomodoro';


/**
 * CODE
 */
class App extends React.Component
{
    /**
     * I require permission to send notifications to the user.
     *
     * :returns: nothing
     * :rtype: undefined
     */
    componentWillMount ()
    {
        Notification.requestPermission();
    }


    /**
     * I render the application.
     *
     * :returns: the content do be rendered
     * :rtype: React.ReactNode
     */
    render ()
    {
        return (
            <div>
                <Pomodoro />
            </div>
        );
    }
}


/**
 * EXPORTS
 */
export default App;
