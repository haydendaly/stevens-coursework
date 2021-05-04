import React from 'react';

const Search = (props) => {
	const handleChange = (e) => {
		props.searchValue(e.target.value);
	};
	return (
		<form
			method='POST '
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
			<label>
				<span>Search: </span>
				<input autoComplete='off' type='text' name='searchTerm' onChange={handleChange} />
			</label>
		</form>
	);
};

export default Search;
