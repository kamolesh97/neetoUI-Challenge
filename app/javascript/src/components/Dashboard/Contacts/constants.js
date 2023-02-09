/* eslint-disable react/jsx-filename-extension */
import React from "react";

import dayjs from "dayjs";
import i18n from "i18next";
import { Avatar, Typography } from "neetoui";
import * as yup from "yup";

export const ROLES = [
  {
    label: i18n.t("contacts.form.role.options.standard"),
    value: "standard",
  },
  {
    label: i18n.t("contacts.form.role.options.admin"),
    value: "admin",
  },
];

export const CONTACTS_FORM_INITIAL_FORM_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

export const CONTACTS_FORM_VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email address is required"),
  role: yup
    .object()
    .shape({
      label: yup
        .string()
        .oneOf(ROLES.map(({ label }) => label))
        .required(),
      value: yup
        .string()
        .oneOf(ROLES.map(({ value }) => value))
        .required(),
    })
    .default(undefined)
    .required("Role is required"),
});

export const CONTACTS_TABLE_COLUMN_DATA = [
  {
    title: "Name & Role",
    dataIndex: "nameAndRole",
    key: "nameAndRole",
    width: "33%",
    render: ({ firstName, lastName, role }) => {
      const fullName = `${firstName} ${lastName}`;

      return (
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <Avatar size="medium" user={{ name: fullName, imageUrl: "" }} />
          </div>
          <div>
            <Typography style="h4">{fullName}</Typography>
            <span>{role.label}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "33%",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    width: "33%",
    render: created_at => (
      <span>{dayjs(created_at).format("MMM, D, YYYY")}</span>
    ),
  },
];

export const VIEWS = [
  {
    id: 1,
    categoryName: "All",
    count: 200,
  },
  {
    id: 2,
    categoryName: "Users",
    count: 80,
  },
  {
    id: 3,
    categoryName: "Leads",
    count: 60,
  },
  {
    id: 4,
    categoryName: "Visitors",
    count: 60,
  },
];
