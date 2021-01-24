import React from 'react';
import PropTypes from 'prop-types'

import {Button, ButtonGroup} from 'reactstrap'

const BulkController = ({clearSelected, clearCompleted, reset} ) => (
    <ButtonGroup>
        <Button className="mr-1" color="danger" onClick={clearSelected}> Delete selected</Button>
        <Button className="mr-1" color="danger" onClick={clearCompleted}> Delete Copleted</Button>
        <Button color="danger" onClick={reset}> Reset</Button>
    </ButtonGroup>
)

BulkController.propTypes = {
    handleFilter: PropTypes.func,
    clearCompleted: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
}
export default BulkController