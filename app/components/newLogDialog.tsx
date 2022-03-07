import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFetcher } from "remix";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function NewLogDialog({ open, handleClose }: Props) {
  const fetcher = useFetcher();
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (fetcher.type === "done") {
      handleClose();
    }
  }, [fetcher.type, handleClose]);

  const _handleClose = (
    _: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (
      reason &&
      reason == "backdropClick" &&
      (ref?.current?.value?.length ?? 0) > 0
    )
      return;
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={_handleClose} fullWidth>
        <fetcher.Form method="post">
          <DialogTitle>New Log</DialogTitle>
          <DialogContent>
            <DialogContentText>Tell me somethings.</DialogContentText>

            <TextField
              inputRef={ref}
              autoFocus
              margin="dense"
              name="text"
              label="Log"
              type="text"
              fullWidth
              multiline
              rows={3}
              variant="standard"
            />
            <TextField
              margin="dense"
              name="datetime"
              label="Log"
              type="date"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              name="_action"
              value={"create"}
              aria-label="create"
            >
              Save
            </Button>
          </DialogActions>
        </fetcher.Form>
      </Dialog>
    </div>
  );
}
