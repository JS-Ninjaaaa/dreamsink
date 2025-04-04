import { Dream, MyDreamSortKey } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import { useState } from "react";
import MyDreamCardDialog from "./card/dialog/MyDreamCardDialog";
import MyDreamCard from "./card/MyDreamCard";
import MyDreamSortKeySelectBox from "./MyDreamSortKeySelectBox";

interface MyDreamCardsProps {
  myDreams: {
    myDreams: Dream[];
    setMyDreams: (newMyDreams: Dream[]) => void;
  };
  sortKey: {
    myDreamSortKey: MyDreamSortKey;
    setMyDreamSortKey: (sortKey: MyDreamSortKey) => void;
  };
}

const MyDreamCards = ({
  myDreams: { myDreams, setMyDreams },
  sortKey: { myDreamSortKey, setMyDreamSortKey },
}: MyDreamCardsProps) => {
  const [openedDreamId, setOpenedDreamId] = useState<number | null>(null);

  return (
    <>
      <MyDreamSortKeySelectBox
        myDreamSortKey={myDreamSortKey}
        setMyDreamSortKey={setMyDreamSortKey}
      />
      <div className="grid px-8 pb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {myDreams.map((dream, index) => (
          <AlertDialog.Root
            key={index}
            open={openedDreamId === dream.id}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                setOpenedDreamId(dream.id);
              } else {
                setOpenedDreamId(null);
              }
            }}
          >
            <MyDreamCard dream={dream} setMyDreams={setMyDreams} />
            <MyDreamCardDialog
              dream={dream}
              setMyDreams={setMyDreams}
              onClose={() => setOpenedDreamId(null)}
            />
          </AlertDialog.Root>
        ))}
      </div>
    </>
  );
};

export default MyDreamCards;
