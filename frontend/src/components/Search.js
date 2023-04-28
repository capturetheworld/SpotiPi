import React, { useState, useEffect, useContext} from "react";
import AuthContext from "../context/AuthContext";
import { TextField } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import logo from '../pictures/spotipi.png';
import axios from 'axios'
import '../styles/landing.css';


const CssTextField = styled(TextField)({
    '& ': {
        color: 'white',
        margin: '10px 10px 10px 10px'
      },
    '& label': {
        color: 'white',
      },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#04AA6D',
      },
      
    },
  });

function Search({ setSearchText}) {
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext)

	return (

            <CssTextField 
                id="outlined-basic" 
                label="Search song or artist" 
                variant="outlined" 
                fullWidth='true'
                size='small'
                sx={{ input: {color: "white"} }}
                onChange={event => setSearchText(event.target.value)}
            />

	);
}

export default Search;