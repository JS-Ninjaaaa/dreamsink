import { createMyDream, fetchMyDreams } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext, useState } from "react";
import MyDreamFormHashtagList from "./MyDreamFormHashtagList";
import MyDreamFormInput from "./MyDreamFormInput";
import MyDreamFormPrivacyToggle from "./MyDreamFormPrivacyToggle";

interface MyDreamInputProps {
  setMyDreams: (dreams: Dream[]) => void;
}

const MyDreamInput = ({ setMyDreams }: MyDreamInputProps) => {
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const { setIsLoading } = useContext(LoadingContext);

  const handleSaveButtonClick = async () => {
    try {
      const newDream = {
        content: content,
        is_public: isPublic,
        likes: 0,
        hashtags: hashtags,
      };
      setIsLoading(true);

      await createMyDream(newDream);
      const myDreams: Dream[] = await fetchMyDreams();

      setMyDreams(myDreams);
      setContent("");
      setHashtags([]);
    } catch (e) {
      alert("夢の保存に失敗しました");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div className="flex w-full flex-col sm:flex-row px-4">
        <MyDreamFormInput content={content} setContent={setContent} />
        <MyDreamFormHashtagList hashtags={hashtags} setHashtags={setHashtags} />
      </div>

      <div className="flex items-center gap-4 mt-4">
        <MyDreamFormPrivacyToggle
          isPublic={isPublic}
          togglePrivacy={() => {
            setIsPublic((prev) => {
              return !prev;
            });
          }}
        />
        <button
          onClick={handleSaveButtonClick}
          className="px-6 py-2 rounded-md bg-pink-400 hover:bg-green-400 text-white mt-4 hover:bg-pink-500  transition"
        >
          保存する
        </button>
      </div>
    </div>
  );
};

export default MyDreamInput;
