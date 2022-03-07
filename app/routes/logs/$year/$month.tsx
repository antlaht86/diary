import { List } from "@mui/material";
import { Prisma } from "@prisma/client";
import { LoaderFunction, Outlet, useLoaderData, useParams } from "remix";
import invariant from "tiny-invariant";
import { MonthComponent } from "~/components/month";
import { db } from "~/db/db";
import isThisYear from "date-fns/isThisYear";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.year, "Expected params.year");

  return db.$queryRaw(
    Prisma.sql`SELECT COUNT(id), to_char(created_at,  'YYYY-MM') as date FROM "public"."Log"
      WHERE to_char(created_at,  'YYYY') = ${params.year}
      GROUP BY date
      ORDER BY date ASC
      ;`
  );
};

export default function Year() {
  const params = useParams();
  invariant(params.year, "Expected params.year");

  const logs = useLoaderData<{ count: number; date: string }[]>();

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="month-list-subheader"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
          padding: "0px",
          margin: "0px",
        }}
      >
        {getMonths(params.year).map((_monthNumber) => {
          const monthNumber = _monthNumber + 1;

          const item = logs.find(
            (s) => Number(s.date.split("-")[1]) === monthNumber
          );
          return (
            <MonthComponent
              key={monthNumber}
              date={item?.date ?? params.year + "-" + monthNumber}
              count={item?.count ?? 0}
            />
          );
        })}
      </List>
      <Outlet />
    </div>
  );
}

function getMonths(year: string) {
  const x = isThisYear(new Date(Number(year), 5, 5));
  if (!x) return [...Array(12).keys()];

  const d = new Date();

  return [...Array(d.getMonth() + 1).keys()];
}
