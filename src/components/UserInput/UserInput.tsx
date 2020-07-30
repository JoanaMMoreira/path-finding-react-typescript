import React, { useState } from "react";
import { UserInputProps } from "../../types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import styles from "./UserInput.module.css";
import { defaultHeight, defaultWidth } from "../../utils";

const UserInput: React.FC<UserInputProps> = ({
  calculatePath,
  setDimensions,
  clearGrid,
}) => {
  const [dimensions, changeDimensions] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });

  const resetAndClear = (): void => {
    changeDimensions({ width: defaultWidth, height: defaultHeight });
    clearGrid();
  };

  return (
    <div className={styles.container}>
      <TextField
        label="Width"
        style={{ marginRight: 10 }}
        type="number"
        variant="filled"
        size="small"
        value={dimensions.width}
        inputProps={{ "data-testid": "width-testid" }}
        onChange={(e) =>
          changeDimensions({ ...dimensions, width: Number(e.target.value) })
        }
      />

      <TextField
        label="Height"
        style={{ marginRight: 10 }}
        type="number"
        variant="filled"
        size="small"
        value={dimensions.height}
        inputProps={{ "data-testid": "height-testid" }}
        onChange={(e) =>
          changeDimensions({
            ...dimensions,
            height: Number(e.target.value),
          })
        }
      />

      <ButtonGroup variant="contained" aria-label="button group" size="small">
        <Button
          onClick={() => setDimensions(dimensions)}
          data-testid="setDimensions-testid"
          startIcon={<Icon>straighten</Icon>}
        >
          Change dimensions
        </Button>

        <Button
          onClick={calculatePath}
          data-testid="start-testid"
          startIcon={<Icon>send</Icon>}
        >
          Find path
        </Button>

        <Button
          onClick={resetAndClear}
          data-testid="reset-testid"
          startIcon={<Icon>refresh</Icon>}
        >
          Reset
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default UserInput;
