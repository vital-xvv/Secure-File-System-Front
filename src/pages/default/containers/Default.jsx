import { useIntl } from 'react-intl';
import React from 'react';
import {Button, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from '../../../constants/pages';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Default() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pagesURLs[pages.filesPage]);
  }

  return (
    // <Typography>
    //   {/*formatMessage({ id: 'title' })*/}
    // </Typography>
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
