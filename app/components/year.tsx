import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText, Collapse, List } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "remix";

type Props = {
  year: string;
};
export function YearComponent({ year }: Props) {
  const params = useParams();

  let navigate = useNavigate();

  const handleClick = (value: string) => {
    if ("month" in params) {
      navigate("/logs/" + value + "/" + params.month);
    } else {
      navigate("/logs/" + value + "/01");
    }
  };

  return (
    <React.Fragment key={year}>
      <ListItemButton onClick={() => handleClick(year)}>
        <ListItemText primary={year} />
      </ListItemButton>
    </React.Fragment>
  );
}
