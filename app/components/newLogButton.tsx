import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Clear from "@mui/icons-material/Clear";
type Props = {
  day: number;

  handleShowAddContent: (arg: number) => void;
  selectedDay: number;
};

export default function NewLog({
  day,
  handleShowAddContent,
  selectedDay,
}: Props) {
  return (
    <IconButton
      sx={{ color: (theme) => theme.palette.primary.light }}
      onClick={() => handleShowAddContent(day)}
      type="button"
      value={"create"}
    >
      {selectedDay === day ? <Clear /> : <AddIcon />}
    </IconButton>
  );
}
