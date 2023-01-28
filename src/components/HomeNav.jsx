import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from "react-router-dom";

const HomeNav = () => {

    const navigate = useNavigate();

    return (
        <>
        <div style={{width: "25%",borderRight:"1px solid grey",position:"fixed",bottom:"0",height:"89vh"}}>
        <Stack spacing={5} style={{paddingTop:"10vh", display:"flex", alignItems:"center"}}>
            <Button variant="text" style={{width:"50%"}} onClick={()=>navigate("/home")}>
            <HomeRoundedIcon fontSize="large" style={{paddingRight:"10px"}}/>
            Home</Button>
            <Button variant="text" style={{width:"50%"}}>
            <SettingsSuggestRoundedIcon fontSize="large" style={{paddingRight:"10px"}} />
            Settings</Button>
            <Button variant="text" style={{width:"50%"}} onClick={()=>navigate("/profile")}>
            <AccountCircleRoundedIcon fontSize="large" style={{paddingRight:"10px"}}/>
            Profile</Button>
        </Stack>
        </div>
        </>
        
    )
}

export default HomeNav