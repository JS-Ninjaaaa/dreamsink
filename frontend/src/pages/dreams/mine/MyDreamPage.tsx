import { fetchMyDreams } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import SakuraScatterEffect from "../components/SakuraScatterEffect";
import MyDreamCards from "./MyDreamCards";
import MyDreamInput from "./MyDreamInput";

export type MyDreamSortKey = "updated_at" | "likes";

const MyDreamPage = () => {
  const [myDreams, setMyDreams] = useState<Dream[]>([]);
  const [sortKey, setSortKey] = useState<MyDreamSortKey>("updated_at");
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const loadMyDreams = async () => {
      try {
        setIsLoading(true);
        const dreams: Dream[] = await fetchMyDreams(sortKey);
        setMyDreams(dreams);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyDreams();
  }, [sortKey]);

  return (
    <div>
      <Header />
      <SakuraScatterEffect />

      <div className="p-4">
        <MyDreamInput setMyDreams={setMyDreams} />

        <div className="mt-3 ml-5 flex items-center gap-2">
          <span className="text-gray-600">並び替え:</span>
          <select
            value={sortKey}
            onChange={(event) => {
              setSortKey(event.target.value as MyDreamSortKey);
            }}
            className="border rounded px-3 py-1 bg-white text-gray-800 shadow-sm"
          >
            <option value="updated_at">更新日順</option>
            <option value="likes">いいね順</option>
          </select>
        </div>
      </div>

      <MyDreamCards myDreams={myDreams} setMyDreams={setMyDreams} />
    </div>
  );
};

export default MyDreamPage;
