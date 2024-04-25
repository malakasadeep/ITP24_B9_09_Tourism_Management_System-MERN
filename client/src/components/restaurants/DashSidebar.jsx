import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { BsFillHousesFill } from "react-icons/bs";
import { IoDocumentTextSharp } from "react-icons/io5";

export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items className=" ">
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/admin/res-dash?tab=restaurant">
            <Sidebar.Item
              active={tab === "restaurant"}
              icon={BsFillHousesFill}
              className="bg-slate-700"
              as="div"
            >
              Restaurant
            </Sidebar.Item>
          </Link>

          <Link to="/admin/res-dash?tab=package">
            <Sidebar.Item
              active={tab === "package"}
              icon={IoDocumentTextSharp}
              className="bg-slate-700"
              as="div"
            >
              Package
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
