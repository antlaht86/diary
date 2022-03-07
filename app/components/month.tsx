import { ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "remix";
import { getMonthToUi } from "~/utils";
import isThisMonth from "date-fns/isThisMonth";

type Props = {
  date: string;
  count: number;
};

export function MonthComponent({ count, date }: Props) {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const params = useParams();
  let navigate = useNavigate();

  const d = new Date(Number(year), Number(month) - 1, 5);
  const _isThisMonth = isThisMonth(d);

  const handleClick = (value: string) => {
    if ("year" in params && "month" in params) {
      navigate(`/logs/${params.year}/${getMonthToUi(value)}`);
    }
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleClick(date)} alignItems="center">
        <ListItemText
          primary={getMonthToUi(date)}
          sx={{
            color: _isThisMonth
              ? "green"
              : params.month === getMonthToUi(date)
              ? "#8bc34a"
              : "unset",
          }}
        />
        <Typography align="center" sx={{ fontSize: "10px", marginLeft: "2px" }}>
          ({count})
        </Typography>
      </ListItemButton>
    </React.Fragment>
  );
}
