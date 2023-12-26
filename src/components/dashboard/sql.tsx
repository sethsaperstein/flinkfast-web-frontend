import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { WebSocketService } from "src/services/web-socket.service";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { useAuth0 } from "@auth0/auth0-react";
import TableHead from "@mui/material/TableHead";

enum QueryState {
    NOT_STARTED = 'NOT_STARTED',
    RUNNING = 'RUNNING',
};

enum SessionState {
    NOT_READY = 'NOT_READY',
    READY = 'READY'
}

interface QueryResult {
  colNames: string[],
  rows: QueryResultRow[],
};

interface QueryResultRow {
    values: string[],
};

export const Sql: React.FC = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryState, setQueryState] = useState<QueryState>(QueryState.NOT_STARTED);
  const [queryId, setQueryId] = useState(0);

  const onChange = (query: string) => {
    setSqlQuery(query);
  };

  const handleClick = () => {
    console.log("button clicked");
    if (queryState === QueryState.NOT_STARTED) {
        submitQuery();
    } else {
        stopQuery();
    }
  };

  const stopQuery = () => {
    setQueryState(QueryState.NOT_STARTED);

    console.log("Stopping query");
  };

  const submitQuery = () => {
    console.log("Submitting query");

    setQueryId(prevId => prevId + 1);
    setQueryState(QueryState.RUNNING);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ display: "flex", flexDirection: "column" }}>
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
                readOnly={queryState === QueryState.RUNNING}
              />
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ display: "flex", flexDirection: "column" }}>
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
                {queryState === QueryState.RUNNING ? (
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
                justifyContent: queryState === QueryState.NOT_STARTED ? 'center' : 'flex-start',
                overflowY: "auto",
              }}
            >
              {queryState === QueryState.NOT_STARTED ? (
                <>
                  <Typography variant="h4">Preview Data</Typography>
                  <Typography variant="h6">
                    Press 'Run Preview' to see sample records.
                  </Typography>
                </>
              ) : (
                <Query queryId={queryId} query={sqlQuery} />
              )}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Query: React.FC<{ queryId: number, query: string }> = ({ queryId, query }) => {
    const webSocketService = new WebSocketService();
    const [queryResult, setQueryResult] = useState<QueryResult | undefined>(undefined);
    const [queryError, setQueryError] = useState<string | undefined>(undefined);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let isMounted = true;
        const configureQuery = async () => {
            const accessToken = await getAccessTokenSilently();

            webSocketService.setOnMessage((message: string) => {
                try {
                  console.log("Received message", message);
                  const parsedResults: QueryResult = JSON.parse(message);
                  
                  setQueryResult((prevResults) => {
                    if (!prevResults) {
                      return parsedResults;
                    }
                    const updatedResults = {
                      ...prevResults,
                      rows: [...prevResults.rows, ...parsedResults.rows],
                    };
              
                    return updatedResults;
                  });
                  setQueryError(undefined);
                } catch (error) {
                  console.error('Error parsing WebSocket message:', error);
                  setQueryError('Error parsing WebSocket message');
                }
            });
            await webSocketService.send(query, queryId.toString(), accessToken);
            
            // avoid scneario where unmounts before async function and
            // leaves socket subscribed. Especially for local Strict mode
            console.log("check if mounted", isMounted);
            if (!isMounted) {
              console.log("disconnected in useEffect");
              webSocketService.disconnect();
            }

        }

        configureQuery();

        return () => {
          webSocketService.disconnect();
          console.log("websocket service disconnect on unmount");
          isMounted = false;
        };
      }, [queryId, getAccessTokenSilently]);
  
    return (
        <>
      {
        queryResult !== undefined ? (
            <Table size="medium">
                <TableHead>
                  <TableRow 
                  sx={{
                    "& th": {
                      fontWeight: "bold",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "white"
                    },
                  }}>
                  {queryResult.colNames.map(colName => (
                      <TableCell key={colName}>{colName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                    {queryResult.rows.map((row, i) => (
                        <TableRow key={i}>
                            {row.values.map((value, j) => 
                                <TableCell key={j}>{value}</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : queryError !== undefined ? (
            {queryError}
        ) : (
            <CircularProgress />
        )
      }
      </>
    );
  };
