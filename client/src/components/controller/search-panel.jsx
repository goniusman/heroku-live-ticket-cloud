import React from 'react'
import PropTypes from 'prop-types'
import {Input, Button} from 'reactstrap'

const SearchPanel = ({term, handleSeach,toggleForm}) => (
    <div className="d-flex my-4">
        <Input
            placeholder="Enter Search Team"
            className="mr-3"
            value={term}
            onChange={e => handleSeach(e.target.value)}
        /> 
        <Button color="success" onClick={toggleForm}>
            New
        </Button>
    </div>
)
SearchPanel.propTypes = {
    term: PropTypes.string.isRequired,
    handleSeach: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired
}
export default SearchPanel