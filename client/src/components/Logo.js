import React from "react"
import { ReactComponent as ShortUrlLogo } from "../media/short-url-h.svg"
import { NavLink } from "react-router-dom";

import { Typography } from "@mui/material";
  import { Box } from "@mui/system";

const Logo = ({ftr}) => (
    <Box sx={{ 
        display: "flex", 
    alignItems: "center", 
    justifyContent: ftr ? {xs: "center", sm: "flex-start"} : "center",  
    textDecoration: 'none' 
    }} component={NavLink} to='/'>
        <Box sx={{ height: 64, mr: 1, padding: '8px 0' }}>
            <ShortUrlLogo style={{ height: '100%', width: 'fit-content' }} />
        </Box>
    </Box>)

export default Logo;