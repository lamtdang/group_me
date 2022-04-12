import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

interface ShowGroupTabProps {
  children?: React.ReactNode;
  groupTab: Map<string, string>;
}

const ShowGroupTab = (props: ShowGroupTabProps) => {

    const getColor = () => { 
        return "hsl(" + 360 * Math.random() + ',' +
                   (25 + 70 * Math.random()) + '%,' + 
                   (85 + 10 * Math.random()) + '%)'
      }

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {Array.from(props.groupTab.entries()).map((value) => {
        return (
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: getColor() }}>
                  <AutoAwesomeMotionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={value[1]} secondary={value[0]} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ShowGroupTab;
