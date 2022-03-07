import { YearComponent } from "./../components/year";
import { LoaderFunction, Outlet, useLoaderData } from "remix";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import { Prisma } from "@prisma/client";
import { db } from "~/db";
import { Divider } from "@mui/material";

export const loader: LoaderFunction = () => {
  return db.$queryRaw(
    Prisma.sql`SELECT COUNT(id), to_char(created_at,  'YYYY') as year FROM "public"."Log"
    GROUP BY year
    ORDER BY year ASC
    ;`
  );
};

type Props = {};

export default function Logs(props: Props) {
  const logs = useLoaderData<{ count: number; year: string }[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Diary</h1>
      <List
        component="nav"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
          padding: "0px",
          margin: "0px",
        }}
      >
        {logs.map((item) => {
          return <YearComponent key={item.year} year={item.year} />;
        })}
      </List>
      <Divider sx={{ margin: "10px 0px" }} />
      <Outlet />
    </div>
  );
}
