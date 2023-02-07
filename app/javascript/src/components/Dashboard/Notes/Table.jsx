import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { NOTES_TABLE_COLUMN_DATA } from "./constants";

const Table = ({ selectedNoteIds, setSelectedNoteIds, notes = [] }) => (
  <div className="notes-table-height w-full">
    <NeetoUITable
      allowRowClick
      rowSelection
      columnData={NOTES_TABLE_COLUMN_DATA}
      rowData={notes}
      selectedRowKeys={selectedNoteIds}
      onRowSelect={selectedRowKeys => setSelectedNoteIds(selectedRowKeys)}
    />
  </div>
);

export default Table;
