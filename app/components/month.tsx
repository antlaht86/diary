import { ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "remix";

type Props = {
  date: string;
  count: number;
};

export function MonthComponent({ count, date }: Props) {
  const params = useParams();
  let navigate = useNavigate();

  const handleClick = (value: string) => {
    if ("year" in params && "month" in params) {
      navigate(`/logs/${params.year}/${value.split("-")[1]}`);
    }
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleClick(date)} alignItems="center">
        <ListItemText primary={date.split("-")[1]} />
        <Typography align="center" sx={{ fontSize: "10px", marginLeft: "2px" }}>
          ({count})
        </Typography>
      </ListItemButton>
    </React.Fragment>
  );
}
