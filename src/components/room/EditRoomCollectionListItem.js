import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { EditRoomContext } from "../../utils/context";
import { PLACE_NAME } from "./EditRoomPlan";

const EditRoomCollectionListItem = ({ collection }) => {
  const {
    contract,
    tokenId,
    name,
    thumbnailUri,
    displayUri,
    artifactUri,
    mimeType,
  } = collection ?? {};
  const { meta, setMeta, currentEditPlace } = useContext(EditRoomContext);
  const skeleton = !name;
  const [isLoaded, setIsLoaded] = useState(false);

  const place = meta?.findIndex(
    (v) => v.contract === contract && v.tokenId === tokenId && tokenId
  );

  const getNewMeta = (index, value) => {
    return meta.map((v, i) => (i === index ? value : v));
  };

  const onSelect = () => {
    if (place === -1) {
      setMeta(getNewMeta(currentEditPlace, { contract, tokenId }));
    } else if (place === currentEditPlace) {
      setMeta(getNewMeta(place, {}));
    }
  };

  return (
    <Card
      sx={(theme) => ({
        width: 270,
        margin: 1.5,
        height: "max-content",
        cursor:
          place === -1 || place === currentEditPlace
            ? "pointer"
            : "not-allowed",
        boxShadow:
          (place ?? -1) !== -1
            ? `0px 0px 10px 3px ${theme.palette.primary.main}`
            : undefined,
      })}
      onClick={onSelect}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          position: "relative",
          aspectRatio: "1",
          backgroundColor: "background.paper",
        }}
      >
        {(place ?? -1) !== -1 && (
          <Box
            variant="h6"
            component="span"
            sx={(theme) => ({
              zIndex: 5,
              width: "auto",
              height: "25%",
              position: "absolute",
              top: "5%",
              right: "5%",
              borderRadius: 999,
              backgroundColor: "primary.main",
              border: "2px solid white",
              textAlign: "center",
              aspectRatio: "1",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.dark",
            })}
          >
            <Typography variant="h6" lineHeight="unset" fontWeight="bold">
              {PLACE_NAME[place]}
            </Typography>
          </Box>
        )}
        {mimeType?.includes("audio") && (
          <audio
            style={{
              width: "90%",
              height: "15%",
              zIndex: 2,
              position: "absolute",
              bottom: "5%",
              left: "5%",
            }}
            src={artifactUri}
            controls
          />
        )}
        {!skeleton && (
          <CardMedia
            sx={{
              zIndex: 1,
              objectFit: "contain",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
            }}
            alt={name}
            component="img"
            image={
              mimeType.includes("image")
                ? artifactUri
                : displayUri ?? thumbnailUri
            }
            onLoad={() => {
              setIsLoaded(true);
            }}
          />
        )}
        {!isLoaded && (
          <Skeleton
            sx={{
              zIndex: 0,
              position: "absolute",
              top: 0,
            }}
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        )}
      </Box>

      {/* <CardContent
        sx={{
          width: "100%",
          boxSizing: "border-box",
          padding: 1,
          "&:last-child": {
            paddingBottom: 0.5,
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 0.5,
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.6rem",
          }}
        >
          {skeleton ? <Skeleton /> : name}
        </Typography>
      </CardContent> */}
    </Card>
  );
};

export default EditRoomCollectionListItem;
