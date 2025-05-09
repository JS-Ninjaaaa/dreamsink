import { toggleMyDreamVisibility } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext } from "react";

interface Props {
  dream: Dream;
  updateMyDreams: (updatedDreamId?: number) => Promise<void>;
}

const MyDreamPrivacyButton = ({ dream, updateMyDreams }: Props) => {
  const { setIsLoading } = useContext(LoadingContext);

  const handleToggle = async (dreamId: number) => {
    try {
      setIsLoading(true);

      await toggleMyDreamVisibility(dreamId);
      if (dream.is_public) {
        // 夢を非公開にする場合
        await updateMyDreams();
      } else {
        // 夢を公開する場合
        // 紙吹雪を出すために公開した夢のIDを渡す
        await updateMyDreams(dreamId);
      }
    } catch (e) {
      alert("夢の公開設定の変更に失敗しました");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        handleToggle(dream.id!);
      }}
      className={`
        h-6 justify-between relative rounded-full flex items-center px-1 transition-colors duration-300
        ${dream.is_public ? "w-14 bg-[#f8a5d1]" : "w-16 bg-[#bcb9b9]"}
      `}
    >
      <span
        className={`
          text-xs font-bold text-white z-10
          ${dream.is_public ? "text-right pr-5" : "text-left pl-5"}
        `}
      >
        {dream.is_public ? "公開" : "非公開"}
      </span>
      <div
        className={`
          w-5 h-5 bg-white rounded-full border-[1px] border-[#d1d5db] absolute transition-transform duration-300
          ${dream.is_public ? "translate-x-7.5" : "-translate-x-0.5"}
        `}
      ></div>
    </button>
  );
};

export default MyDreamPrivacyButton;
