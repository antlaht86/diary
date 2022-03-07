import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useFetcher } from "remix";

type Props = {
  datetime: string;
  day: number;
  handleShowAddContent: (arg: number) => void;
};

export default function NewLog({ datetime, day, handleShowAddContent }: Props) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.type === "done") {
      handleShowAddContent(day);
    }
  }, [day, fetcher.type, handleShowAddContent]);

  return (
    <fetcher.Form method="post">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          fullWidth
          id="outlined-textarea"
          name="text"
          label="Text"
          multiline
          rows={5}
        />
        <input type="hidden" name="datetime" defaultValue={datetime} />
        <Button
          sx={{ width: "100px", marginTop: "10px" }}
          type="submit"
          name="_action"
          value={"create"}
          aria-label="create"
        >
          Save
        </Button>
      </Box>
    </fetcher.Form>
  );
}
