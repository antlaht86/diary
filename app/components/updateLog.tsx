import { IconButton } from "@mui/material";
import { useFetcher } from "remix";
import UpdateRounded from "@mui/icons-material/UpdateRounded";

type Props = {
  id: number;
  text: string;
};

export default function UpdateLog({ id, text }: Props) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <input type={"hidden"} defaultValue={id} name={"id"} />
      <IconButton
        type="submit"
        name="_action"
        value={"update"}
        aria-label="update"
      >
        <UpdateRounded />
      </IconButton>
    </fetcher.Form>
  );
}
