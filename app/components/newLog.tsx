import { SaveAlt } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
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
      <TextField
        id="outlined-textarea"
        name="text"
        label="Text"
        multiline
        rows={5}
      />
      <input type="hidden" name="datetime" defaultValue={datetime} />
      <IconButton
        type="submit"
        name="_action"
        value={"create"}
        aria-label="create"
      >
        <SaveAlt />
      </IconButton>
    </fetcher.Form>
  );
}
