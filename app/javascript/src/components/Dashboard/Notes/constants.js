import * as yup from "yup";

export const NOTES_FORM_INITIAL_FORM_VALUES = {
  title: "",
  description: "",
};

export const NOTES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const NOTES_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "30%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "70%",
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

export const DUMMY_NOTES = [
  {
    id: 1,
    title: "How to claim the warranty 1?",
    description: `"Are you getting my texts???" she texted to him. He glanced at it and chuckled under his breath. Of course he was getting them, but if he wasn't getting`,
  },
  {
    id: 2,
    title: "How to claim the warranty 2?",
    description: `"Are you getting my texts???" she texted to him. He glanced at it and chuckled under his breath. Of course he was getting them, but if he wasn't getting`,
  },
  {
    id: 3,
    title: "How to claim the warranty 3?",
    description: `"Are you getting my texts???" she texted to him. He glanced at it and chuckled under his breath. Of course he was getting them, but if he wasn't getting`,
  },
  {
    id: 4,
    title: "How to claim the warranty 4?",
    description: `"Are you getting my texts???" she texted to him. He glanced at it and chuckled under his breath. Of course he was getting them, but if he wasn't getting`,
  },
];
