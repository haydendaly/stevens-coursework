import React from 'react'

const SearchComponent = (props) => {
    const handleChange = (e) => {
        props.searchValue(e.target.value)
    }
    return (
        <form
            method="POST "
            onSubmit={(e) => {
                e.preventDefault()
            }}
            name="formName"
            className="center"
        >
            <label>
                <span>Search: </span>
                <input
                    autoComplete="off"
                    type="text"
                    name="searchTerm"
                    onChange={handleChange}
                    autoFocus="autoFocus"
                    placeholder="search"
                    value={props.searchTerm}
                />
            </label>
        </form>
    )
}

export default SearchComponent
