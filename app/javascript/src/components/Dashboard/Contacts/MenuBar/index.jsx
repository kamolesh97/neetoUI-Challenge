import React from "react";

import { MenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { VIEWS } from "../constants";

const Menu = ({ showMenu }) => {
  const { t } = useTranslation();

  return (
    <MenuBar showMenu={showMenu} title={t("common.contacts")}>
      {VIEWS.map(({ id, categoryName, count }) => (
        <MenuBar.Block
          active={categoryName === VIEWS[0].categoryName}
          count={count}
          key={id}
          label={categoryName}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
