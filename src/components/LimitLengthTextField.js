import { TextField, TextFieldProps } from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";

/**
 *
 * @param {TextFieldProps} props
 * @returns
 */
const LimitLengthTextField = (props) => {
  const { limit = 32, value, onChange, ...textFieldProps } = props;

  const [_value, _setValue] = useState("");
  const [isOnComposition, setIsOnComposition] = useState(false);
  const [textLen, setTextLen] = useState(_value.length);

  const getLimitedString = (str, limit) => {
    const charArray = [];
    str.split("").forEach((c) => {
      // eslint-disable-next-line no-control-regex
      if (c.match(/[\u0000-\u00ff]/)) {
        charArray.push(c);
      } else {
        charArray.push("", c);
      }
    });

    return charArray.slice(0, limit).join("");
  };

  const _onChange = (e) => {
    const newValue = getLimitedString(e.target.value, limit);
    if (!isOnComposition) {
      e.target.value = newValue;
      let len = 0;
      newValue.split("").forEach((c) => {
        // eslint-disable-next-line no-control-regex
        if (c.match(/[\u0000-\u00ff]/)) {
          len += 1;
        } else {
          len += 2;
        }
      });
      setTextLen(len);
    }
    _setValue(newValue);
    onChange?.(e);
  };

  return (
    <TextField
      value={_value}
      onChange={_onChange}
      inputProps={{
        onCompositionStart: useCallback((e) => {
          setIsOnComposition(true);
        }, []),
        onCompositionEnd: useCallback((e) => {
          _onChange(e);
          setIsOnComposition(false);
        }, []),
        onBlur: useCallback((e) => {
          e.target.value = e.target.value.trim();
          _onChange(e);
        }, []),
      }}
      helperText={`(${textLen}/${limit})`}
      {...textFieldProps}
    />
  );
};

export default LimitLengthTextField;
