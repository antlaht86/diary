import { Box, Button, TextField } from "@mui/material";
import { useFetcher } from "remix";

import { useEffect } from "react";

type Props = {
  id: number;
  text: string;
  setEdit: React.Dispatch<React.SetStateAction<number>>;
};

export default function EditLog({ id, text, setEdit }: Props) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.type === "done") {
      setEdit(0);
    }
  }, [fetcher.type, setEdit]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <fetcher.Form method="post">
        <input type={"hidden"} defaultValue={id} name={"id"} />
        <TextField
          fullWidth
          id="outlined-textarea"
          name="text"
          label="Text"
          multiline
          defaultValue={text}
          rows={3}
        />
        <Box>
          <Button type="submit" name="_action" value={"edit"} aria-label="edit">
            Save
          </Button>
          <Button type="button" onClick={() => setEdit(0)} aria-label="cancel">
            Cancel
          </Button>
        </Box>
      </fetcher.Form>
    </Box>
  );
}
