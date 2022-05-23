import { Snackbar, Tooltip, Typography, TypographyProps } from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopyRounded";
import { useCallback, useState } from "react";

/**
 *
 * @param {TypographyProps} props
 */
const RoomId = (props) => {
  const { id, variant, color, sx, ...typographyProps } = props;

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const onClickCopy = () => {
    navigator.clipboard.writeText(id).then(() => {
      setIsSnackbarOpen(true);
    });
  };

  return (
    <>
      <Tooltip title="Click to copy" arrow followCursor>
        <Typography
          variant={variant ?? "body2"}
          color={color ?? "text.secondary"}
          sx={{
            fontSize: { sm: "0.875rem", xs: "0.75rem" },
            height: "fit-content",
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
            lineHeight: 1,
            "&:hover": {
              color: "text.primary",
              textDecoration: "underline dotted 2px",
            },
            ...(sx ?? {}),
          }}
          onClick={onClickCopy}
          {...typographyProps}
        >
          <CopyIcon
            fontSize="small"
            sx={{ mr: 0.5, fontSize: { sm: "1.25rem", xs: "1rem" } }}
          />
          {id}
        </Typography>
      </Tooltip>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={useCallback(() => {
          setIsSnackbarOpen(false);
        }, [])}
        message="Room ID copied."
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "max-content",
            minWidth: "max-content",
            pl: 3,
            pr: 3,
          },
        }}
      />
    </>
  );
};

export default RoomId;
