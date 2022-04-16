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
import AddNewUI from './AddNewTab'
import ShowGroupTab from './ShowGroupTab'


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const App = () => {
  const [value, setValue] = React.useState(0);

  const [urlGroupMap, setUrlGroupMap] = React.useState(new Map<string, string>())

  const [urlPatternList, setUrlPatternList] = React.useState(Array<string>())

  const [groupNameList, setGroupNameList] = React.useState(Array<string>())

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };  

  const saveGroup = (newGroupName: string, newUrlPattern: string) => {
    console.log(urlGroupMap)
    setUrlGroupMap(urlGroupMap.set(newUrlPattern, newGroupName))
    chrome.storage.local.set({'groupme': JSON.stringify(Array.from(urlGroupMap.entries()))});
  }

  React.useEffect(() => {
    chrome.storage.local.get('groupme',  (result) => {
      console.log("hello", new Map(JSON.parse(result.groupme)))
      setUrlGroupMap(new Map(JSON.parse(result.groupme)))
    })
  }, [])

  React.useEffect(() => {
    setGroupNameList(Array.from(urlGroupMap.values()))
    setUrlPatternList(Array.from(urlGroupMap.keys()))
  }, [urlGroupMap])

  return (
    <div className="App">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="full width icon tabs example"
            variant="fullWidth"
            centered
          >
            <Tab icon={<CheckCircleOutlineIcon />} {...a11yProps(0)} />
            <Tab icon={<AddIcon />} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ShowGroupTab groupTab={urlGroupMap} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddNewUI saveGroup={saveGroup} existingGroupName={groupNameList} existingUrlPattern={urlPatternList}/>
        </TabPanel>
      </Box>
    </div>
  );
};

export default App;
