import { TextField } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

/**
 *
 * @param {import ("@mui/material").TextFieldProps } props
 * @returns
 */
const LimitLengthTextField = (props) => {
  const {
    limit = 32,
    value,
    onChange,
    showCount = true,
    ...textFieldProps
  } = props;

  const [_value, _setValue] = useState("");
  const [isOnComposition, setIsOnComposition] = useState(false);
  const [textLen, setTextLen] = useState(_value?.length ?? 0);

  useEffect(() => {
    setTextLen(getLen(value));
    _setValue(value);
  }, [value]);

  const getLimitedString = (str, limit) => {
    const charArray = [];
    str?.split("")?.forEach((c) => {
      // eslint-disable-next-line no-control-regex
      if (c.match(/[\u0000-\u00ff]/)) {
        charArray.push(c);
      } else {
        charArray.push("", c);
      }
    });

    return charArray.slice(0, limit).join("");
  };

  const getLen = (str) => {
    let len = 0;
    str?.split("")?.forEach((c) => {
      // eslint-disable-next-line no-control-regex
      if (c.match(/[\u0000-\u00ff]/)) {
        len += 1;
      } else {
        len += 2;
      }
    });
    return len;
  };

  const _onChange = (e) => {
    const newValue = getLimitedString(e.target.value, limit);
    if (!isOnComposition) {
      e.target.value = newValue;
      let len = getLen(newValue);
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
      helperText={showCount ? `(${textLen}/${limit})` : undefined}
      {...textFieldProps}
    />
  );
};

export default LimitLengthTextField;
