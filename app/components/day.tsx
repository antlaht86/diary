import { ListItemText, ListItem, ListItemIcon } from "@mui/material";
import { Log } from "@prisma/client";
import format from "date-fns/format";
import DeleteLog from "./deleteLog";

type Props = {
  log: Log;
};

export function DayComponent({ log }: Props) {
  const d = new Date(log.created_at);

  return (
    <ListItem>
      <ListItemText primary={log.text} secondary={format(d, "HH:MM")} />
      <ListItemIcon>
        <DeleteLog id={log.id} />
      </ListItemIcon>
    </ListItem>
  );
}
