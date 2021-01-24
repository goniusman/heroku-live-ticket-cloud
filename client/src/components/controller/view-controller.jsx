import React from 'react';
import PropTypes from 'prop-types'

import {Label, CustomInput} from 'reactstrap'


const ViewController = ({changeView, view}) => (
    <div className="d-flex">
        <Label htmlFor="list-view" className="mr-4">
            <CustomInput
                type="radio"
                name="list"
                value="list"
                id="list-view"
                onChange={changeView}
                className="d-inline-block"
                checked={view === 'list'}
            />
                List View
        </Label>

        <Label htmlFor="table-view" className="mr-4">
            <CustomInput
                type="radio"
                name="table"
                value="table"
                id="table-view"
                onChange={changeView}
                className="d-inline-block"
                checked={view === 'table'}
            />
            Table View
        </Label>

    </div>
)


ViewController.propTypes = {
    view: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired
}

export default ViewController