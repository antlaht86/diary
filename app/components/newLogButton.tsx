import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
type Props = {
  handleShowAddContent: (arg: number) => void;
  day: number;
};

export default function NewLog({ day, handleShowAddContent }: Props) {
  return (
    <IconButton
      onClick={() => handleShowAddContent(day)}
      type="button"
      value={"create"}
    >
      <AddIcon />
    </IconButton>
  );
}
