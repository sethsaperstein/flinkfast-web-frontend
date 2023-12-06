import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, makeStyles, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AceEditor from "react-ace";
import { WidthFull } from "@mui/icons-material";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export const Editor: React.FC = () => {
  const [sqlQuery, setSqlQuery] = useState("");

  const onChange = (query: string) => {
    setSqlQuery(query);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          height: "50px",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ marginLeft: 2 }}>
          SQL
        </Typography>
      </Box>
      <Box>
        <AceEditor
          mode="sql"
          theme="github"
          onChange={onChange}
          name="ace-editor"
          editorProps={{ $blockScrolling: true }}
          style={{ width: "auto", height: "300px" }}
          showPrintMargin={false}
        />
      </Box>
    </Box>
  );
};

export const Results: React.FC = () => {
  const [queryResults, setQueryResults] = useState("");
  const [queryRunning, setQueryRunning] = useState(false);

  const handleClick = () => {
    console.log("button clicked", queryRunning);
    if (!queryRunning) {
      setQueryRunning(true);
    } else {
      setQueryRunning(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          height: "50px",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ m: 2 }}>
          Preview
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            backgroundColor: "grey",
            m: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {queryRunning ? (
            <>
              <StopIcon sx={{ marginRight: 1 }} />
              Cancel
            </>
          ) : (
            <>
              <PlayArrowIcon sx={{ marginRight: 1 }} />
              Run Preview
            </>
          )}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "300px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!queryRunning && queryResults === "" ? (
          <>
            <Typography variant="h4">Preview Data</Typography>
            <Typography variant="h6">
              Press 'Run Preview' to see sample records.
            </Typography>
          </>
        ) : (
          <> foo </>
        )}
      </Box>
    </Box>
  );
};
