import React from 'react'

export default function SearchPanel({term, handleSeach}) {
    return (
        <>
            <div className="content-header pt-4 pb-4">
                                        <div className="content">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-md-8 offset-md-2">
                                                        <form action="simple-results.html">
                                                            <div className="input-group">
                                                                <input 
                                                                type="search" 
                                                                className="form-control form-control-lg" 
                                                                value={term}
                                                                onChange={e => handleSeach(e.target.value)}
                                                                 placeholder="Type your keywords here" />
                                                                <div className="input-group-append">
                                                                    <button type="submit" className="btn btn-lg btn-default" style={{backgroundColor: '#f8f9fa',
                                                                        borderColor: '#ddd',
                                                                        color: '#444'}}>
                                                                        <i className="fa fa-search"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                        </div>    
                                        </div>
                                    </div>
        </>
    )
}
