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
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
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
import { createSession, getSession } from "src/services/flinkfast.service";
import { AppError } from "src/models/app-error";

enum QueryState {
    NOT_STARTED = 'NOT_STARTED',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
};

enum SessionState {
    NOT_READY = 'NOT_READY',
    READY = 'READY'
}

interface QueryResultMessage {
  type: "query_results";
  colNames: string[],
  rows: QueryResultRow[],
};

interface QueryResultRow {
  values: string[],
};

interface ErrorMessage {
  type: "error";
  message: string;
} 

interface SuccessMessage {
  type: "success";
  message: string;
}

type SocketMessage = SuccessMessage | ErrorMessage | QueryResultMessage;


const POLL_INTERVAL = 5000; 
const MAX_POLLING_TIME = 5 * 60 * 1000; 


export const Sql: React.FC = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryState, setQueryState] = useState<QueryState>(QueryState.NOT_STARTED);
  const [queryId, setQueryId] = useState(0);
  const [sessionState, setSessionState] = useState<SessionState>(SessionState.NOT_READY);
  const { getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    const startSession = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await createSession(accessToken);
      if (data) {
        console.log("Creating session: ", data);
      } else {
        console.log("Failed to create session: ", error?.message);
      }

      const timeoutTimer = setTimeout(() => {
        clearInterval(interval);
        setSessionState(SessionState.NOT_READY);
      }, MAX_POLLING_TIME);

      const pollStatus = async () => {
        const { data, error } = await getSession(accessToken);
  
        if (data) {
          console.log("Session in state: ", data.status);
          if (data.status === "RUNNING") {
            clearInterval(interval);
            clearTimeout(timeoutTimer);
            setSessionState(SessionState.READY);
          }
        } else {
          console.log("Failed to get session: ", error?.message);
        }
      };

      const interval = setInterval(pollStatus, POLL_INTERVAL);

      await pollStatus();

      return () => {
        clearInterval(interval);
        clearTimeout(timeoutTimer);
      };
    };

    startSession();

  }, [getAccessTokenSilently]);

  const circleStyle = { 
    width: 10, 
    height: 10,
    animation: 'pulse 1.5s infinite alternate',
    backgroundColor: sessionState === SessionState.READY ? 'green' : 'orange',
    borderRadius: '50%',
  };

  const onChange = (query: string) => {
    setSqlQuery(query);
  };

  const handleStopRun = () => {
    console.log("button clicked");
    if (queryState === QueryState.NOT_STARTED || queryState == QueryState.COMPLETED) {
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

  const handleQueryComplete = () => {
    console.log("Query completed.");
    setQueryState(QueryState.COMPLETED);
  }

  const handleDeploy = () => {
    console.log("Deploy Query");
  }

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
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" sx={{ marginLeft: 2 }}>
                SQL
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {sessionState === SessionState.READY ? "Running" : "Starting..."}
                </Typography>
                <Box 
                  component="span" 
                  sx={{ ...circleStyle, marginRight: 2, marginLeft: 1 }} />
              </Box>
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
              <Box>
                <Typography variant="h5" sx={{ m: 2 }}>
                  Preview
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button
                  variant="contained"
                  onClick={handleDeploy}
                  sx={{
                    backgroundColor: "grey",
                    m: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <>
                    <RocketLaunchIcon sx={{ marginRight: 1 }} />
                    Deploy
                  </>
                </Button>
                <Button
                  variant="contained"
                  onClick={handleStopRun}
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
                <Query queryId={queryId} query={sqlQuery} onQueryComplete={handleQueryComplete} />
              )}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Query: React.FC<{ queryId: number, query: string, onQueryComplete: () => void }> = ({ queryId, query, onQueryComplete }) => {
    let webSocketService = new WebSocketService();
    const [queryResult, setQueryResult] = useState<QueryResultMessage | undefined>(undefined);
    const [queryError, setQueryError] = useState<string | undefined>(undefined);
    const [queryMessage, setQueryMessage] = useState<string | undefined>(undefined);

    const { getAccessTokenSilently } = useAuth0();

    const handleQueryResults = (results: QueryResultMessage) => {
      setQueryResult((prevResults) => {
        if (!prevResults) {
          return results;
        }
        const updatedResults = {
          ...prevResults,
          rows: [...prevResults.rows, ...results.rows],
        };
  
        return updatedResults;
      });
      setQueryError(undefined);
    };

    const handleSuccess = (sucess: SuccessMessage) => {
      if (queryResult === undefined) {
        setQueryMessage(sucess.message);
      }
      onQueryComplete();
      webSocketService.disconnect();
    };

    const handleError = (error: ErrorMessage) => {
      setQueryError(error.message);
      onQueryComplete();
      webSocketService.disconnect();
    };

    useEffect(() => {
        let isMounted = true;

        // clear state on mount
        setQueryError(undefined);
        setQueryMessage(undefined);
        setQueryResult(undefined);

        const configureQuery = async () => {
            const accessToken = await getAccessTokenSilently();

            webSocketService.setOnMessage((message: string) => {
                try {
                  console.log("Received message", message);
                  const parsedResults: SocketMessage = JSON.parse(message);

                  switch (parsedResults.type) {
                      case "success":
                          handleSuccess(parsedResults as SuccessMessage);
                          break;
                      case "error":
                          handleError(parsedResults as ErrorMessage);
                          break;
                      case "query_results":
                          handleQueryResults(parsedResults as QueryResultMessage);
                          break;
                      default:
                          console.warn("Received unknown message type:", parsedResults);
                  }
                } catch (error) {
                  console.error('Error parsing WebSocket message:', error);
                  setQueryError(error instanceof Error ? error.message : String(error));
                }
            });
            await webSocketService.send(query, queryId.toString(), accessToken);
            console.log("websocket send awaited");
            // avoid scenario where unmounts before async function and
            // leaves socket subscribed. Especially for local Strict mode
            // which mounts twice back to back
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
          setQueryResult(undefined);
          setQueryError(undefined);
        };
      }, [queryId, getAccessTokenSilently]);
  
    return (
        <>
      {
        queryError !== undefined ? (
          <Box
            sx = {{
              display: "flex",
              alignItems: "flex-start",
              alignContent: "flex-start",
              width: "100%",
              padding: "10px"
            }}
          >
            <Typography variant="body1" style={{color: 'red', whiteSpace: 'pre' }} >
              {queryError}
            </Typography>
          </Box>
        ) : queryResult !== undefined ? (
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
        ) : queryMessage !== undefined ? (
          <Box
            sx = {{
              display: "flex",
              alignItems: "flex-start",
              alignContent: "flex-start",
              width: "100%",
              padding: "10px"
            }}
          >
            <Typography variant="body1" style={{ whiteSpace: 'pre' }} >
              {queryMessage}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )
      }
      </>
    );
  };
