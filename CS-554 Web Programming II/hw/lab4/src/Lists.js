import React, { useState, useEffect } from "react";
import { CardContent, CardMedia, Grid } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';
import Error from "./Error";

const allowedTypes = [ "comics", "characters", "series" ];
const types = {
	"comics" : "Comics",
	"characters" : "Characters",
	"series" : "Series"
}

const md5 = require('blueimp-md5');
const publickey = 'bf9909a4f0751dbc0594dcd80173524c';
const privatekey = 'b23dd0cf174853f86d91b41c512fccd85c0d014f';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/';
 
const Lists = (props) => {
	const regex = /(<([^>]+)>)/gi;
	const [ loading, setLoading ] = useState(true);
	const [ listData, setListData ] = useState(undefined);
	const [ searchData, setSearchData ] = useState(undefined);
	const [ searchTerm, setSearchTerm ] = useState('');
    const [ type, setType ] = useState(undefined);
	const [ error, setError ] = useState(false);
	const [ hasPrior, setHasPrior ] = useState(false);
    const [ hasNext, setHasNext ] = useState(true);
    let card = undefined;

	useEffect(() => {
		async function fetchData() {
			try {
				setError(false);
				let { type, pagenum } = props.match.params;
				if (allowedTypes.includes(type)) setType(type);
				else throw 'not-found';
				if (!isNaN(pagenum) && pagenum < 0) throw 'not-found';
				if (pagenum > 0) setHasPrior(true);
				const { data } = await axios.get(baseUrl + type + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&offset=' + (pagenum * 20));
				if (data.data.offset >= data.data.total) setError(true);
				if (data.data.offset >= data.data.total - 20) setHasNext(false);
				setListData(data.data.results);
				setLoading(false);
			} catch (e) {
				setError(true);
				setLoading(false);
			}
		}
		fetchData();
	}, [props.match.params, searchTerm]);

	useEffect(
		() => {
			async function fetchData() {
				try {
					let { type } = props.match.params;
					if (allowedTypes.includes(type)) setType(type);
					else throw 'not-found';
					const { data } = await axios.get(baseUrl + type + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + (type === 'characters' ? '&nameStartsWith=' : '&titleStartsWith=') + searchTerm);
					setSearchData(data.data.results);
					setLoading(false);
				} catch (e) {
					setError(true);
					setLoading(false);
				}
			}
			if (searchTerm) {
				fetchData();
			}
		},
		[props.match.params.type, searchTerm]
	);

	const searchValue = async (value) => {
		setSearchTerm(value);
	};
	const buildCard = (data) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={data.id}>
				<div className='card-view' variant='outlined'>
					<Link to={`/${type}/${data.id}`}>
						<CardMedia
							component='img'
							image={data.thumbnail && data.thumbnail.path && data.thumbnail.extension ? data.thumbnail.path + '.' + data.thumbnail.extension : ''}
							title='show image'
						/>
						<CardContent>
							<h3>
								{type === 'characters' ? data.name : data.title}
							</h3>
							<p>
								{data.description ? data.description.replace(regex, '').substring(0, 139) + '...' : 'No Summary'}
								<br />
								<span>More Info</span>
							</p>
						</CardContent>
					</Link>
				</div>
			</Grid>
		);
	};

	if (searchTerm) {
		card =
			searchData &&
			searchData.map(body => {
				return buildCard(body);
			});
	} else {
		card =
			listData &&
			listData.map(body => {
				return buildCard(body);
			});
	}

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else if (error) {
		return (
			<Error />
		);
	} else {
		return (
			<div>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<h2>{types[type]}</h2>
					<Search searchValue={searchValue} />
				</div>
				<br />
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
					{hasPrior && (<a href={`/${type}/page/${(parseInt(props.match.params.pagenum) - 1)}`}>Prior Page</a>)}
					{(hasPrior && hasNext) && (<span>&nbsp;&nbsp;</span>)}
                    {hasNext && (<a href={`/${type}/page/${(props.match.params.pagenum ? parseInt(props.match.params.pagenum) + 1 : 1)}`}>Next Page</a>)}
				</div>
				<br />
				<Grid container spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
};
 
export default Lists;