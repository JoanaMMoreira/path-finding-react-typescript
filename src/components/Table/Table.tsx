import React from "react";
import { TableProps, Cell } from "../../types";
import TableCell from "./TableCell";
import styles from "./TableStyles.module.css";

const Table = ({ table, start, end, path }: TableProps) => {
  return (
    <div className={styles.gridRoot}>
      <table className={styles.gridTable}>
        <tbody>
          {table.map((row: Cell[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell: Cell, colIndex: number) => (
                <TableCell
                  {...{
                    key: `${rowIndex}-${colIndex}`,
                    cell,
                    rowIndex,
                    colIndex,
                    start,
                    end,
                    path,
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
