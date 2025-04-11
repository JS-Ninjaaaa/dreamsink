import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import MyDreamPrivacyButton from "./MyDreamCardPrivacyButton";

interface MyDreamCardProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const getPinkGradientClass = (likes: number = 0): string => {
  if (likes >= 100) {
    return "to-pink-500";
  } else if (likes >= 70) {
    return "to-pink-400";
  } else if (likes >= 50) {
    return "to-pink-300";
  } else if (likes >= 30) {
    return "to-pink-200";
  } else if (likes >= 10) {
    return "to-pink-100";
  }
  return "to-pink-50";
};

const MyDreamCard = ({ dream, setMyDreams }: MyDreamCardProps) => {
  const gradientClass = getPinkGradientClass(dream.likes);
  return (
    <div className="flex flex-col items-center p-4">
      {/* 突起 */}
      <div className="w-[100px] h-[40px] rounded-full bg-[#ffbadf] border-2 border-gray-500 z-10" />

      {/* 軸 */}
      <div className="w-[40px] h-[20px] bg-white border-l-2 border-r-2 border-gray-500 z-0" />

      {/* 本体 */}
      <AlertDialog.Trigger>
        <div
          className={`
            relative rounded-t-[95px] rounded-b-[50px] md:w-[220px] md:h-[220px] w-[240px] h-[240px] 
            flex flex-col items-center justify-center gap-2
            bg-gradient-to-b from-white border-2 border-gray-500
            ${gradientClass}
          `}
        >
          <div className="text-base font-mpulus text-center px-6 mt-3 mb-1 line-clamp-3">
            {dream.content}
          </div>
          <div className="bg-white rounded-2xl px-4 py-2 flex flex-col items-center">
            <div className="font-mpulus flex gap-2 items-center">
              <span className="text-lg">{dream.likes}</span>
              <p className="text-xs">いいね</p>
            </div>
            <MyDreamPrivacyButton dream={dream} setMyDreams={setMyDreams} />
          </div>
        </div>
      </AlertDialog.Trigger>
    </div>
  );
};

export default MyDreamCard;
