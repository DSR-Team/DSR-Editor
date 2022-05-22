import { Box } from "@mui/material";

const AnimateArrow = ({
  arrowNum = 3,
  size = 30,
  color = "primary.main",
  sx,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: (size * 1.414 * 7) / 6,
        height:
          ((size * 1.414 * 7) / 6) * (arrowNum / 2 + 0.5) +
          size * ((2 / 3) * 1.414),
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          "@keyframes animate": {
            "0%": {
              opacity: 0,
              transform: `rotate(45deg) translate(${(-size * 2) / 3}px, ${
                (-size * 2) / 3
              }px)`,
            },
            "50%": {
              opacity: 1,
            },
            "100%": {
              opacity: 0,
              transform: `rotate(45deg) translate(${(size * 2) / 3}px, ${
                (size * 2) / 3
              }px)`,
            },
          },
        }}
      >
        {Array.from({ length: arrowNum }, () => ({})).map((v, i) => (
          <Box
            component="span"
            sx={{
              display: "block",
              width: size,
              height: size,
              borderBottomWidth: size / 6,
              borderRightWidth: size / 6,
              borderBottomStyle: "solid",
              borderRightStyle: "solid",
              borderColor: color,
              transform: "rotate(45deg)",
              margin: `${-size / 3}px`,
              animation: "animate 1.5s infinite",
              animationDelay: `${-0.2 * i}s`,
            }}
          ></Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnimateArrow;
