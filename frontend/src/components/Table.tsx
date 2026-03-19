import { Fragment, type ReactNode } from "react";
import "./css/Table.css";

interface TableColumn<T> {
  label: string;
  render: (rowData: T) => ReactNode;
  header?: () => ReactNode;
  headerClassName?: string;
}

interface TableProps<T> {
  data: T[];
  config: TableColumn<T>[];
  keyFn: (rowData: T) => string | number;
}

function Table<T>({ data, config, keyFn }: TableProps<T>) {
  const renderedHeaders = config.map((column) => {
    const thClasses = `table-th ${column.headerClassName || ""}`.trim();

    if (column.header) {
      return (
        <th key={column.label} className={thClasses}>
          <Fragment>{column.header()}</Fragment>
        </th>
      );
    }

    return (
      <th key={column.label} className={thClasses}>
        {column.label}
      </th>
    );
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr className="table-row" key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table className="table-main">
        <thead className="table-header">
          <tr>
            {renderedHeaders}
          </tr>
        </thead>
        <tbody className="table-body">
          {renderedRows}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
