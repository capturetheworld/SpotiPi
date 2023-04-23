import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import { Button } from "@mui/material";
import logo from '../pictures/spotipi.png';
import AuthContext from "../context/AuthContext";
import '../styles/header.css';
import axios from "axios";

function Header({ spotifyApi }) {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const { accessToken } = useContext(AuthContext)

    useEffect(() => {
        //console.log(spotifyApi)
        console.log(searchText)
        if (!accessToken) return
        spotifyApi.searchTracks(searchText)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    },[searchText])

    const handleClick = async () => {
        console.log(searchText)

        spotifyApi.searchTracks(searchText)
        .then(data => {
            console.log(data)
        })
    }

    return (
        <div className='head'>
            <img className='logo' src={logo} alt="logo" />
            <Search className='search' setSearchText={setSearchText} />
            <Button
                sx={{ color: 'white', backgroundColor: '#04aa6d', height: '50px', width: '100px', marginTop: '10px' }}
                onClick={handleClick}
            >
                Search
            </Button>
        </div>
    )
}

export default Header;