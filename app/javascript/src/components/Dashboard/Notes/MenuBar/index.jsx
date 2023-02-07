import React from "react";

import { MenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { VIEWS } from "../constants";

const Menu = ({ showMenu }) => {
  const { t } = useTranslation();

  return (
    <MenuBar showMenu={showMenu} title={t("common.notes")}>
      {VIEWS.map(({ category, count }) => (
        <MenuBar.Block
          active={category === VIEWS[0].category}
          count={count}
          key={category}
          label={category}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
