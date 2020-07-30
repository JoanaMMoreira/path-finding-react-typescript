import React from "react";
import { TableCellProps } from "../../types";
import cn from "classnames";
import styles from "./TableStyles.module.css";

const TableCell: React.FC<TableCellProps> = ({
  cell,
  rowIndex,
  colIndex,
  start,
  end,
  path,
}) => {
  const isClosed = path && path[rowIndex][colIndex]?.isClosed;
  const isPath = path && path[rowIndex][colIndex]?.isPath;
  const isChecked = path && path[rowIndex][colIndex]?.fCost !== 0;
  const animationOffset = path ? path[rowIndex][colIndex]?.counter : 0;

  return (
    <td
      key={`${rowIndex}-${colIndex}`}
      data-testid={`cell-${rowIndex}-${colIndex}`}
      className={cn(
        styles.gridCell,
        styles[cell.status],
        { [styles.start]: rowIndex === start.x && colIndex === start.y },
        { [styles.end]: rowIndex === end.x && colIndex === end.y },
        { [styles.closed]: isClosed },
        { [styles.checked]: isChecked },
        { [styles.path]: isPath }
      )}
      style={{
        animationDelay: animationOffset
          ? `${animationOffset * 10}ms`
          : undefined,
      }}
    ></td>
  );
};

export default React.memo(TableCell);
