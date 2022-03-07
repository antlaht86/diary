import { ListItemText, ListItem, ListItemIcon } from "@mui/material";
import { Log } from "@prisma/client";
import format from "date-fns/format";
import React from "react";
import DeleteLog from "./deleteLog";
import EditLog from "./editLog";
import EditLogButton from "./editLogButton";

type Props = {
  edit: boolean;
  log: Log;
  setEdit: React.Dispatch<React.SetStateAction<number>>;
};

export function DayComponent({ edit, log, setEdit }: Props) {
  const d = new Date(log.created_at);

  return (
    <ListItem>
      {edit ? (
        <EditLog id={log.id} text={log.text} setEdit={setEdit} />
      ) : (
        <React.Fragment>
          <ListItemText primary={log.text} secondary={format(d, "HH:MM")} />
          <ListItemIcon>
            <EditLogButton logId={log.id} setEdit={setEdit} />
          </ListItemIcon>
          <ListItemIcon>
            <DeleteLog id={log.id} />
          </ListItemIcon>
        </React.Fragment>
      )}
    </ListItem>
  );
}
