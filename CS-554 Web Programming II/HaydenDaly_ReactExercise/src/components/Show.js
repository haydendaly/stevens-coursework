import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
const useStyles = makeStyles({
	card: {
		maxWidth: 550,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12
	}
});

const Show = (props) => {
	const [ showData, setShowData ] = useState(undefined);
	const [ loading, setLoading ] = useState(true);
	const classes = useStyles();
	const tConvert = (time) => {
		// Check correct time format and split into components
		time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [ time ];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(''); // return adjusted time or original string
	};
	const formatDate = (showdate) => {
		var year = showdate.substring(0, 4);
		var month = showdate.substring(5, 7);
		var day = showdate.substring(8, 10);
		return month + '/' + day + '/' + year;
	};
	useEffect(
		() => {
			async function fetchData() {
				try {
					const { data: show } = await axios.get(`http://api.tvmaze.com/shows/${props.match.params.id}`);
					setShowData(show);
					setLoading(false);
					console.log(show);
				} catch (e) {
					console.log(e);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
	);

	let summary = null;
	const regex = /(<([^>]+)>)/gi;
	if (showData && showData.summary) {
		summary = showData && showData.summary.replace(regex, '');
	} else {
		summary = 'No Summary';
	}

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<Card className={classes.card} variant='outlined'>
				<CardHeader className={classes.titleHead} title={showData.name} />
				<CardMedia
					className={classes.media}
					component='img'
					image={showData.image && showData.image.original ? showData.image.original : noImage}
					title='show image'
				/>

				<CardContent>
					<Typography variant='body2' color='textSecondary' component='span'>
						<dl>
							<p>
								<dt className='title'>Average Rating:</dt>
								{showData && showData.rating.average ? <dd>{showData.rating.average}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Offical Site:</dt>
								{showData && showData.officialSite ? (
									<dd>
										<a rel='noopener noreferrer' target='_blank' href={showData.officialSite}>
											{showData.name} Offical Site
										</a>
									</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Network:</dt>
								{showData && showData.network ? <dd>{showData.network && showData.network.name}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Language:</dt>
								{showData && showData.language ? <dd>{showData.language}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Runtime:</dt>
								{showData && showData.runtime ? <dd>{showData.runtime + ' Min'}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Premiered:</dt>
								{showData && showData.premiered ? <dd>{formatDate(showData.premiered)}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Country:</dt>
								{showData && showData.network && showData.network.country.name ? (
									<dd>{showData.network.country.name}</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Time Zone:</dt>
								{showData && showData.network && showData.network.country.timezone ? (
									<dd>{showData.network.country.timezone}</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Airtime:</dt>
								{showData && showData.schedule.time ? <dd>{tConvert(showData.schedule.time)}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Days Aired:</dt>
								{showData && showData.schedule.days && showData.schedule.days.length >= 1 ? (
									<span>
										{showData.schedule.days.map((day) => {
											if (showData.schedule.days.length > 1) return <dd key={day}>{day}s,</dd>;
											return <dd key={day}>{day}s</dd>;
										})}
									</span>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Status:</dt>
								{showData && showData.status ? <dd>{showData.status}</dd> : <dd>N/A</dd>}
							</p>

							<p>
								<dt className='title'>Genres:</dt>
								{showData && showData.genres && showData.genres.length >= 1 ? (
									<span>
										{showData.genres.map((genre) => {
											if (showData.genres.length > 1) return <dd key={genre}>{genre},</dd>;
											return <dd key={genre}>{genre}</dd>;
										})}
									</span>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Summary:</dt>
								<dd>{summary}</dd>
							</p>
						</dl>
						<Link to='/shows'>Back to all shows...</Link>
					</Typography>
				</CardContent>
			</Card>
		);
	}
};

export default Show;
