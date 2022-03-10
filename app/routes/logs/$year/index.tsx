import { LoaderFunction, Outlet } from "remix";
import { requireUserId } from "~/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
};

export default function Year() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
