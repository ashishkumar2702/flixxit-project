import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getRecentlyWatched } from '../apis/Home'
import { useLocation } from 'react-router-dom'
import '../styles/allcards.css'
import axios from 'axios'
export default function Search(params) {
    const title = 'Search Results'
    const [cards, setCards] = useState([])
    const location = useLocation()
    const searchApiUrl = ''
    useEffect(() => {
        const query = window.location.href.split('/').pop()
        if (query.length > 0)
            axios.get(process.env.REACT_APP_BACKEND_URL + '/search/' + query).then(res => {
                let data = res.data.results
                // let tdata = []
                // for (let i = 0; i < data.length; i++) {
                //     tdata.push({
                //         _id: data[i].id,
                //         title: data[i].title,
                //         rating: data[i].vote_average,
                //         genre: data[i].genre,
                //         releaseDate: new Date(data[i].release_date),
                //         description: data[i].overview,
                //         cast: data[i].cast,
                //         videoUrl: '',
                //         intro_skip: '20',
                //         poster: data[i].poster_path ? 'http://image.tmdb.org/t/p/w500' + data[i].poster_path : '/Images/no-image.jpg'
                //     })
                // }
                // setCards([...tdata])
                setCards([...res.data])
            }).catch(err => {
                console.log(err)
            })
    }, [location])
    return (
        <Box sx={{ minHeight: '100vh', p: '5vh', pt: '15vh', color: 'white' }}>
            <Box sx={{ fontSize: '3vh', mb: '3vh' }}>{title}</Box>
            <Box className='allcards' sx={{ '.movie-card-container': { overflow: 'hidden' } }}>
                {cards.map((card, ind) => <MovieCard key={ind} data={card} />)}
            </Box>
            {cards.length == 0 && <Box sx={{ fontSize: '3vh', display: 'flex', justifyContent: 'center', py: '5vh' }}>No Movies Found in DataBase</Box>}
        </Box>
    )
}
