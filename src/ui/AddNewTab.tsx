import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddNewUIProps {
    existingGroupName: string[],
    existingUrlPattern: string[],
    saveGroup: (groupName: string, urlPattern: string) => void
}

const AddNewUI = (props: AddNewUIProps) => {
    const [groupName, setGroupName] = React.useState('')
    const [urlPattern, setUrlPattern] = React.useState('')
    const onGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value)
    }
    const onUrlPatternChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrlPattern(event.target.value)
    }
    const handleSubmit = () => {
        if (props.existingGroupName.includes(groupName)) {
            console.log("group name existed")
        }

        if (props.existingUrlPattern.includes(urlPattern)) {
            console.log("url pattern existed")
        }

        props.saveGroup(groupName, urlPattern)
    }

    return (
        <div className="Add-style">
            <TextField
              id="outlined-basic"
              label="URL Pattern"
              variant="outlined"
              size="small"
              fullWidth
              className="mb-10"
              onChange={onUrlPatternChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
              size="small"
              fullWidth
              className="mb-10"
              onChange={onGroupNameChange}
              required
            />
            <Button variant="contained" className="mt-10" onClick={handleSubmit}>
              Add
            </Button> 
          </div>
    )
}

export default AddNewUI