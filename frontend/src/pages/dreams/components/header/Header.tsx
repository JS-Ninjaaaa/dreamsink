import { useEffect, useRef, useState } from "react";
import HeaderMenu from "./menu/HeaderMenu";
import MobileMenu from "./menu/MobileMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // メニューのアイテムをまとめた
  const menuList = [
    { name: "みんなの夢", link: "/dreams/public" },
    { name: "自分の夢", link: "/dreams/mine" },
  ];

  // 画面幅が640px以上になったらハンバーガーメニューを閉じる
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 外側クリックでハンバーガーメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="bg-[#FF99CC] from-orange-200 via-pink-200 to-red-200 text-black py-4 px-6 flex justify-between items-center shadow-md">
        {/* ロゴ */}
        <h1 className="text-[#444444] text-2xl font-bold">Dream Base</h1>

        <HeaderMenu
          menuList={menuList}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </nav>

      <MobileMenu
        menuList={menuList}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </>
  );
};

export default Header;
