import * as React from "react";
import "./App.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

interface ShowResultScreenProps {
  errorList: string[];
  exitResultScreen: () => void;
}

const ReloadButton = styled(IconButton)({
  fontSize: "35px",
  border: "2px solid white",
  "&:hover": {
    border: "1px solid white",
  },
});
const ResultScreen = (props: ShowResultScreenProps) => {
  return props.errorList.length === 0 ? (
    <div className="Result-success">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <CheckCircleOutlineIcon
          sx={{ fontSize: 100, color: "white", marginTop: "40px" }}
        />
        <p
          style={{
            fontSize: 30,
            color: "white",
            marginTop: "0px",
            marginBottom: "20px",
          }}
        >
          Success
        </p>
        {/* <Button variant="outlined" startIcon={<ReplayIcon />} onClick={props.exitResultScreen} sx={{color: "white", margintTop: "15px"}}>
          Delete
        </Button> */}
        <ReloadButton
          variant="outlined"
          aria-label="replay"
          onClick={props.exitResultScreen}
        >
          <ReplayIcon
            fontSize="inherit"
            sx={{ color: "white", fontWeight: 900 }}
          />
        </ReloadButton>
      </Stack>
    </div>
  ) : (
    <div className="Result-failed">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <ErrorOutlineIcon
          sx={{ fontSize: 100, color: "white", marginTop: "40px" }}
        />
        <p
          style={{
            fontSize: 30,
            color: "white",
            marginTop: "0px",
            marginBottom: "20px",
          }}
        >
          Error
        </p>
        {/* <Button variant="outlined" startIcon={<ReplayIcon />} onClick={props.exitResultScreen} sx={{color: "white", margintTop: "15px"}}>
          Delete
        </Button> */}
        <Grid container>
          <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start">
            <ul style={{margin: "5px"}}>
              {props.errorList.map((value) => {
                return (
                  <li style={{ color: "white", fontSize: "12px", }}>
                      {value}
                  </li>
                );
              })}
            </ul>
          </Grid>
          <Grid item xs={6} justifyContent="center" alignItems="center">
            <ReloadButton
              variant="outlined"
              aria-label="replay"
              onClick={props.exitResultScreen}
            >
              <ReplayIcon
                fontSize="inherit"
                sx={{ color: "white", fontWeight: 900 }}
              />
            </ReloadButton>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default ResultScreen;
