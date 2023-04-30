import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import { Button } from "@mui/material";
import logo from '../pictures/spotipi.png';
import AuthContext from "../context/AuthContext";
import '../styles/header.css';
//import axios from "axios";

function Header({ spotifyApi, searchResults, setSearchResults, searchText, setSearchText }) {
    const { accessToken } = useContext(AuthContext)

    const getSearchResult = () => {
        let cancel = false
        spotifyApi.searchTracks(searchText).then(res => {
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
          )
        })
    
        return () => (cancel = true)
    }

    useEffect(() => {
        if (!searchText) return setSearchResults([])
        if (!accessToken) return
        getSearchResult();

      }, [searchText, accessToken])

    const handleClick = async () => {
        getSearchResult();
    }

    return (
        <div className='head'>
            <img className='logo' src={logo} alt="logo" />
            <Search className='search' setSearchText={setSearchText} />
            <Button
                sx={{ color: 'white', backgroundColor: '#04aa6d', height: '35px', width: '75px', marginTop: '10px' }}
                onClick={handleClick}
            >
                Search
            </Button>
        </div>
    )
}

export default Header;