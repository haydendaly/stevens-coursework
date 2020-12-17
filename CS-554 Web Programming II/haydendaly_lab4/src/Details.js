import React, { useState, useEffect } from "react";
import { CardContent, CardMedia } from '@material-ui/core';
import axios from 'axios';
import Error from "./Error";

const allowedTypes = [ "comics", "characters", "series" ];

const md5 = require('blueimp-md5');
const publickey = 'bf9909a4f0751dbc0594dcd80173524c';
const privatekey = 'b23dd0cf174853f86d91b41c512fccd85c0d014f';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/';
 
const Details = (props) => {
	const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(undefined);
    const [ type, setType ] = useState(undefined);
    const [ error, setError ] = useState(false);
    
    const [width, setWidth]   = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

	useEffect(() => {
		async function fetchData() {
			try {
				let { type, id } = props.match.params;
				if (allowedTypes.includes(type)) setType(type);
				else throw 'not-found';
				const { data } = await axios.get(baseUrl + type + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
                if (data.data.results.length <= 0) setError(true);
                setData(data.data.results[0]);
                console.log(data.data.results[0])
				setLoading(false);
			} catch (e) {
				setError(true);
				setLoading(false);
			}
		}
		fetchData();
	}, [props.match.params]);

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
	} else if (type === 'characters' || type === 'comics' || type === 'series') {
        return (
            <div style={{ display: 'flex', flexDirection: width > 660 ? 'row' : 'column' }}>
                <CardMedia
                    component='img'
                    image={data.thumbnail && data.thumbnail.path && data.thumbnail.extension ? data.thumbnail.path + '.' + data.thumbnail.extension : ''}
                    title='show image'
                    style={{ borderRadius: 10, maxWidth: 500 }}
				/>
                <CardContent>
                    <h2><b>Name: </b>{type === 'characters' ? data.name : data.title}</h2>
                    {data.description && data.description !== '' && <p><b>Description: </b>{data.description}</p>}
                    {type !== 'characters' && data.creators.length !== 0 && <p><b>Creators: </b>{data.creators.items.map(creator => creator.name).join(', ')}</p>}
                    {type === 'series' && (
                        <div>
                            {data.rating && data.rating !== '' && <p><b>Rating: </b>{data.rating}</p>}
                            {data.startYear && data.startYear !== '' && <p><b>Start Year: </b>{data.starYear}</p>}
                            {data.endYear && data.endYear !== '' && <p><b>End Year: </b>{data.endYear}</p>}
                        </div>
                    )}
                    {type === 'comics' && (
                        <div>
                            {data.pagecount && data.pagecount !== '' && <p><b>Pagecount: </b>{data.pagecount}</p>}
                            {data.prices && data.prices.length !== 0 && <p><b>Prices: </b>{data.prices.map(val => val.price).join(', ')}</p>}
                            {data.isbn && data.isbn !== '' && <p><b>ISBN: </b>{data.isbn}</p>}
                            {data.issn && data.issn !== '' && <p><b>ISSN: </b>{data.issn}</p>}
                        </div>
                    )}
                    <p><b>Last Modified: </b>{data.modified}</p>
                </CardContent>
            </div>
        );
	} else {
        return <Error />;
    }
};
 
export default Details;