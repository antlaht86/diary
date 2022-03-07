import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
type Props = {
  setEdit: React.Dispatch<React.SetStateAction<number>>;
  logId: number;
};

export default function EditLogButton({ logId, setEdit }: Props) {
  return (
    <IconButton onClick={() => setEdit(logId)} type="button">
      <EditIcon />
    </IconButton>
  );
}
