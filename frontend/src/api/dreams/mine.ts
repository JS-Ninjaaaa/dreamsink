import { RequestDream } from "@/types/dream";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const fetchMyDreams = async ( sortBy = "updated_at" ) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/dreams/mine?sort_by=${sortBy}`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("夢の取得に失敗しました");
  }

  const myDreams = await response.json();
  return myDreams;
};

export const createMyDream = async (dream: RequestDream) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/dreams/mine`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dream),
  });

  if (!response.ok) {
    throw new Error("夢の保存に失敗しました");
  }

  const newDream = await response.json();
  return newDream;
};

export const toggleMyDreamVisibility = async (dreamId: number) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/dreams/mine/${dreamId}`, {
    method: "PATCH",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("夢の公開設定の変更に失敗しました");
  }

  const updatedDream = await response.json();
  return updatedDream;
};

export const deleteMyDream = async (dreamId: number) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/dreams/mine/${dreamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("夢の削除に失敗しました");
  }

  return;
};
// 編集用
export const editMyDream = async (dreamId: number) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }
  // ここで夢を取得して
};
