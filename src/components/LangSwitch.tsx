import React, { useState } from "react";
import { Settings } from "luxon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Language from "@mui/icons-material/Language";

import i18n from "../i18n";

export const currentLang = () =>
  (window.localStorage.getItem("i18nextLng") || "en")
    .substring(0, 2)
    .toLowerCase();

export const getDistanceName = () => (currentLang() === "en" ? "ml" : "km");
export const getCurrency = () => {
  const map = {
    en: "usd",
    ru: "грн",
  };
  return map[currentLang() as keyof typeof map];
};

export const LangSwitch = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const currentLanguage = currentLang();

  const openMenu = (event: any) => setAnchorEl(event.currentTarget);

  const changeLanguage = (lng: "en" | "ru") => () => {
    i18n.changeLanguage(lng);
    Settings.defaultLocale = lng === "en" ? "en" : lng;
    setAnchorEl(null);
  };

  return (
    <div>
      <Button style={{ color: "white" }} onClick={openMenu}>
        <Language style={{ marginRight: 5 }} />
        {currentLanguage}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={changeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={changeLanguage("ru")}>Русский</MenuItem>
      </Menu>
    </div>
  );
};
