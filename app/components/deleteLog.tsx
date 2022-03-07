import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFetcher } from "remix";

type Props = {
  id: number;
};

export default function DeleteLog({ id }: Props) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <input type={"hidden"} defaultValue={id} name={"id"} />
      <IconButton
        type="submit"
        name="_action"
        value={"delete"}
        aria-label="delete"
      >
        <Delete />
      </IconButton>
    </fetcher.Form>
  );
}
