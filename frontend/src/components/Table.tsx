import { type ReactNode } from "react";
import "./css/Table.css";

interface TableColumn<T> {
  label: string;
  render: (rowData: T, index: number) => ReactNode;
  header?: () => ReactNode;
  headerClassName?: string;
}

interface TableProps<T> {
  data: T[];
  config: TableColumn<T>[];
  keyFn: (rowData: T) => string | number;
}

function Table<T>({ data, config, keyFn }: TableProps<T>) {
  const renderedHeaders = config.map((column, index) => {
    const thClasses = `table-th ${column.headerClassName || ""}`.trim();

    return (
      <th key={`${column.label}-${index}`} className={thClasses} scope="col">
        {column.header ? column.header() : column.label}
      </th>
    );
  });

  const renderedRows = data.map((rowData, index) => {
    const renderedCells = config.map((column) => {

      return (
        <td key={column.label}>
          {column.render(rowData, index)}
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
          {renderedRows.length > 0 ? (renderedRows) :
            (
              <tr>
                <td colSpan={config.length} className="table-empty">
                  Brak danych do wyświetlenia
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
