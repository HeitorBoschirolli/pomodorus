/**
 * IMPORTS
 */
import React from 'react';


/**
 * CODE
 */
class Steps extends React.Component
{
    /**
     * I create the steps list.
     *
     * :returns: list with the steps
     * :rtype: React.ReactNode
     */
    createStepsList ()
    {
        // define css classes
        const baseItemClass = 'list-group-item mt-2';
        const notStartedItemClass = baseItemClass + ' bg-secondary';
        const activeItemClass = baseItemClass + ' bg-warning';
        const completedItemClass = baseItemClass + ' bg-success';

        // return a list of steps with proper css classes
        return this.props.cicle.map((step, index) =>
        {
            let itemClass;

            // step already completed: mark it as completed
            if (index < this.props.step)
            {
                itemClass = completedItemClass;
            }

            // step ongoing: mark it as ongoing
            else if (index === this.props.step)
            {
                itemClass = activeItemClass;
            }

            // step not started: mark it as not started
            else
            {
                itemClass = notStartedItemClass;
            }

            // return the list item with the proper css classes
            return (
                <li className={itemClass} key={index}>
                    {step}
                </li>
            );
        });
    }


    /**
     * I render this component.
     *
     * :returns: content to be rendered
     * :rtype: React.ReactNode
     */
    render ()
    {
        return (
            <div className="d-flex">
                <ul className="list-group list-group-horizontal mx-auto justify-content-center">
                    {this.createStepsList()}
                </ul>
            </div>
        );
    }
}


/**
 * EXPORTS
 */
export default Steps;
