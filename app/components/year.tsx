import { ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "remix";
import isThisYear from "date-fns/isThisYear";

type Props = {
  year: string;
};
export function YearComponent({ year }: Props) {
  const d = new Date(Number(year), 5, 5);

  const _isThisYear = isThisYear(d);

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
        <ListItemText
          primary={year}
          sx={{ color: _isThisYear ? "green" : "unset" }}
        />
      </ListItemButton>
    </React.Fragment>
  );
}
