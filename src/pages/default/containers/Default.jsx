import { useIntl } from 'react-intl';
import React, {useEffect, useState} from 'react';
import {Button, Container} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from '../../../constants/pages';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import localStorageUtils from '../../../misc/storage'
import {keys} from '../../../misc/storage';
import * as authApi from '../../../app/api/authApi';
import { useLocation } from 'react-router-dom';

function Default() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [authUrl, setAuthUrl] = useState("");
  const [code, setCode] = useState("");
  const location = useLocation();


    useEffect( () => {
        const queryParams = new URLSearchParams(location.search);
        setCode(queryParams.get('code'));
        console.log("Code - " , queryParams.get('code'));
        async function fetch() {
            if(queryParams.get('code') !== "" && queryParams.get('code') !== null){
                authApi.fetchAccessToken(queryParams.get('code')).then(resp => {
                    setAccessToken(resp.data.token);
                    localStorageUtils.setItem(keys.ACCESS_TOKEN, resp.data.token);
                });
            }
            if(checkIfAccessTokenNotPresent()){
                authApi.fetchAuthUrl().then(resp => {
                    setAuthUrl(resp.data.url);
                    console.log("AuthUrl - ", resp.data.url);
                });
            }
        }
        fetch().then(r => console.log("UseEffect done"));

    }, []);

  const checkIfAccessTokenNotPresent = () => {
      return localStorageUtils.getItem(keys.ACCESS_TOKEN) === "" || localStorageUtils.getItem(keys.ACCESS_TOKEN) === null
  }

  const handleClick = () => {
      let url = pagesURLs[pages.filesPage]
      if(checkIfAccessTokenNotPresent()){
          console.log(authUrl)
          window.location = authUrl;
      }
      else {
          navigate(url);
      }
  }

  return (
      <Container sx={{display: "flex", justifyContent:"center"}}>
        <Button
            variant="contained"
            color="warning"
            onClick={handleClick}
            endIcon={<ArrowForwardIcon fontSize={"1rem"}/>}
        >
          See available files
        </Button>
      </Container>
  );
}

export default Default;
