import * as React from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ResultScreen from "./ResultScreen"

interface AddNewUIProps {
  existingGroupName: string[];
  existingUrlPattern: string[];
  saveGroup: (groupName: string, urlPattern: string) => void;
}

const AddNewUI = (props: AddNewUIProps) => {
  const [groupName, setGroupName] = React.useState("");
  const [urlPattern, setUrlPattern] = React.useState("");
  const [showResultScreen, setShowResultScreen] = React.useState(false);
  const [inputErrorList, setInputErrorList] = React.useState(Array<string>());
  const onGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };
  const onUrlPatternChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlPattern(event.target.value);
  };
  const handleSubmit = () => {
    var errorArr = Array<string>()
    if (props.existingGroupName.includes(groupName)) {
        errorArr.push(`Group Name ${groupName} already existed`)
    }

    if (props.existingUrlPattern.includes(urlPattern)) {
        errorArr.push(`URL ${urlPattern} already existed`)
    }

    setInputErrorList(
        [...inputErrorList, ...errorArr]
      );

    console.log(inputErrorList)
    if (inputErrorList.length === 0) {
      props.saveGroup(groupName, urlPattern);
    }

    setShowResultScreen(true);
  };

  const exitResultScreen = () => {
    setGroupName("")
    setUrlPattern("")
    setShowResultScreen(false)
    setInputErrorList([])
  }

  return showResultScreen ? (
    <ResultScreen errorList={inputErrorList} exitResultScreen={exitResultScreen} />
  ) : (
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
  );
};

export default AddNewUI;
