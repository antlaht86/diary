import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { db } from "~/db/db";
import { addHours, endOfMonth, format, startOfMonth } from "date-fns";
import List from "@mui/material/List";
import { DayComponent } from "~/components/day";
import { Log } from "@prisma/client";
import { Box, Divider } from "@mui/material";
import NewLogButton from "~/components/newLogButton";
import NewLog from "~/components/newLog";
import { useState } from "react";
import isSameDay from "date-fns/isSameDay";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.year, "Expected params.year");
  invariant(params.month, "Expected params.year");

  const d = new Date(Number(params.year), Number(params.month) - 1, 12);

  const end = addHours(endOfMonth(d), 2);
  const start = addHours(startOfMonth(d), 2);

  return db.log.findMany({
    where: {
      created_at: {
        gt: start,
        lt: end,
      },
    },
    orderBy: {
      created_at: "asc",
    },
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const action = formData.get("_action")?.toString();
  const datetime = formData.get("datetime")?.toString();
  const text = formData.get("text")?.toString();
  const id = Number(formData.get("id")?.toString());

  const user = await db.user.findFirst();
  invariant(user, "missing user");
  invariant(action, "missing action");

  switch (action) {
    case "create": {
      invariant(datetime, "missing datetime");
      invariant(text, "missing text");
      await db.log.create({
        data: {
          text,
          created_at: datetime,
          user_id: user.id,
        },
      });
      break;
    }

    case "edit": {
      invariant(id, "missing id");
      invariant(text, "missing text");

      await db.log.updateMany({
        where: {
          user_id: user.id,
          id,
        },
        data: {
          text,
        },
      });
      break;
    }

    case "delete": {
      invariant(id, "missing id");

      await db.log.deleteMany({
        where: {
          user_id: user.id,
          id,
        },
      });
      break;
    }
    default: {
      throw new Error("Action missing");
    }
  }

  return redirect("/logs/" + params?.year + "/" + params?.month);
};

export default function MonthPage() {
  const logs = useLoaderData<Log[]>();
  const days = getDays(logs);
  const [addNew, setAddNew] = useState(0);
  const [edit, setEdit] = useState(0);

  function handleShowAddContent(day: number) {
    setAddNew(day === addNew ? 0 : day);
  }

  return (
    <List>
      <Divider sx={{ margin: "10px 0px" }} />
      {Object.keys(days)
        .map((i) => Number(i))
        .map((item) => {
          const _logs = logs.filter(
            (log) => new Date(log.created_at).getDate() === item
          );

          const d = new Date(_logs[0].created_at);
          const currentDay = new Date();

          const _isSameDay = isSameDay(currentDay, d);

          return (
            <List
              key={item.toString()}
              subheader={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component={"span"}
                    sx={{ color: _isSameDay ? "green" : "unset" }}
                  >
                    {format(d, "d.M.yyyy")}
                  </Box>
                  <NewLogButton
                    day={item}
                    handleShowAddContent={handleShowAddContent}
                    selectedDay={addNew}
                  />
                </Box>
              }
            >
              {addNew === item && (
                <NewLog
                  datetime={String(_logs[0].created_at)}
                  day={item}
                  handleShowAddContent={handleShowAddContent}
                />
              )}
              {_logs.map((log) => (
                <DayComponent
                  key={log.id}
                  log={log}
                  setEdit={setEdit}
                  edit={edit === log.id}
                />
              ))}
              <Divider sx={{ margin: "5px 0px" }} />
            </List>
          );
        })}
    </List>
  );
}

function getDays(logs: Log[]) {
  const retval: { [key: string]: number[] } = {};

  for (const log of logs) {
    const d = new Date(log.created_at);
    const dayNumber = d.getDate();
    if (dayNumber in retval) {
      retval[dayNumber].push(log.id);
    } else {
      retval[dayNumber] = [log.id];
    }
  }

  return retval;
}
