import { YearComponent } from "./../components/year";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useParams,
} from "remix";
import * as React from "react";
import List from "@mui/material/List";

import { Log, Prisma, User } from "@prisma/client";
import { db } from "~/db";
import { Box, Button, Divider } from "@mui/material";
import NewLogDialog from "~/components/newLogDialog";
import invariant from "tiny-invariant";
import { requireUserId } from "~/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const data = await db.$queryRaw(
    Prisma.sql`SELECT COUNT(id), to_char(created_at,  'YYYY') as year FROM "public"."Log" 
    WHERE user_id = ${userId}
    GROUP BY year
    ORDER BY year ASC
    ;`
  );

  return { data, user };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();

  const action = formData.get("_action")?.toString();
  const text = formData.get("text")?.toString();
  const datetime = formData.get("datetime")?.toString();

  let newLog: Log | null = null;

  invariant(action, "missing action");

  const getCreatedAt = (d: Date) => {
    const x = new Date();

    const newD = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      x.getHours(),
      x.getMinutes(),
      x.getSeconds(),
      0
    );
    return newD;
  };

  switch (action) {
    case "create": {
      invariant(text, "missing text");
      newLog = await db.log.create({
        data: {
          text,
          user_id: userId,
          created_at: datetime ? getCreatedAt(new Date(datetime)) : undefined,
        },
      });
      break;
    }

    default: {
      throw new Error("Action missing");
    }
  }
  invariant(newLog, "missing newLog");

  const d = new Date(newLog.created_at);

  return redirect("/logs/" + d.getFullYear() + "/" + (d.getMonth() + 1));
};

type Props = {};
type LoaderData = {
  data: { count: number; year: string }[];
  user: User;
};
export default function Logs(props: Props) {
  const logs = useLoaderData<LoaderData>();
  const params = useParams();

  invariant(params.year, "missing year params");
  const [showNewInput, setShowNewInput] = React.useState(false);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {showNewInput && (
        <NewLogDialog
          open={showNewInput}
          handleClose={() => setShowNewInput(false)}
        />
      )}
      <Box>
        <Box sx={{ display: "flex" }}>
          <h1 style={{ textTransform: "capitalize" }}>
            {logs.user.username}'s Diary
          </h1>
          <Button color="primary" onClick={() => setShowNewInput(true)}>
            New
          </Button>
        </Box>
      </Box>

      <List
        component="nav"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
          padding: "0px",
          margin: "0px",
        }}
      >
        {logs.data.map((item) => {
          return (
            <YearComponent
              key={item.year}
              year={item.year}
              currentYear={params.year ?? "0"}
            />
          );
        })}
      </List>
      <Divider sx={{ margin: "10px 0px" }} />
      <Outlet />
    </div>
  );
}
