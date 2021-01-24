import React from 'react';
import PropTypes from 'prop-types'

import {Button, ButtonGroup} from 'reactstrap'

const FilterController = ({handleFilter} ) => (
    <ButtonGroup>
        <Button className="mr-1" onClick={() => handleFilter('all')}> All</Button>
        <Button className="mr-1" onClick={() => handleFilter('pending')}> Pending</Button>
        <Button onClick={() => handleFilter('solved')}> Solved</Button>
    </ButtonGroup>
) 

FilterController.propTypes = {
    handleFilter: PropTypes.func.isRequired
}
export default FilterController