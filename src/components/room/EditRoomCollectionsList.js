import {
  Box,
  Button,
  Grid,
  Pagination,
  PaginationItem,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { COLLECTION_TYPES } from "../../hooks/useCollections";
import { EditRoomContext } from "../../utils/context";
import { useTheme } from "@mui/material/styles";
import EditRoomCollectionListItem from "./EditRoomCollectionListItem";
import useScrollbar from "../../hooks/useScrollbar";

const ALLOWED_TYPES = [
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [4],
  [4],
];

const DISPLAY_COLLECTION_TYPES = ["image", "gif", "video", "audio", "3d model"];

const EditRoomCollectionsList = () => {
  const {
    collectionTabIndex,
    setCollectionTabIndex,
    collectionPage,
    setCollectionPage,
    shownCollections,
    counts,
  } = useOutletContext();
  const { currentEditPlace } = useContext(EditRoomContext);
  const scrollRef = useScrollbar();

  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (_, newValue) => {
    setCollectionTabIndex(newValue);
    setCollectionPage(1);
  };

  const gridProps = {
    item: true,
    container: true,
    direction: "row",
    justifyContent: "center",
    width: isUpMd ? undefined : "25vw",
    minWidth: isUpMd ? undefined : 120,
    md: 4,
    lg: 3,
    xl: 2,
  };

  const count = counts[collectionTabIndex];

  const handlePageChange = (_, value) => {
    setCollectionPage(allowedTypes[value]);
  };

  const allowedTypes = ALLOWED_TYPES[currentEditPlace];

  useEffect(() => {
    setCollectionPage(1);
    setCollectionTabIndex(allowedTypes[0]);
  }, [currentEditPlace]);

  const tabValue = allowedTypes.indexOf(collectionTabIndex);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "max-content",
          ml: { xs: 2.5, lg: 2 },
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={tabValue !== -1 ? tabValue : 0}
          onChange={handleChange}
          sx={{
            minHeight: { xs: 32, lg: 48 },

            "& button": {
              padding: { xs: "8px 10px", lg: "12px 16px" },
              minHeight: { xs: 32, lg: 48 },
              minWidth: { xs: 60, lg: 90 },
              fontSize: { xs: "0.5rem", lg: "0.875rem" },
            },
          }}
        >
          {allowedTypes.map((v, i) => (
            <Tab
              key={DISPLAY_COLLECTION_TYPES[v]}
              label={DISPLAY_COLLECTION_TYPES[v]}
              tabIndex={i}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: isUpMd ? "center" : "flex-start",
          pb: isUpMd ? 6 : 0,
        }}
        ref={scrollRef}
      >
        <Grid
          container
          direction="row"
          width={isUpMd ? "100%" : "max-content"}
          sx={{ mt: { xs: 4, md: 0 } }}
        >
          {shownCollections?.map((collection, i) => (
            <Grid key={`collection_${collection?.name ?? i}`} {...gridProps}>
              <EditRoomCollectionListItem collection={collection} />
            </Grid>
          ))}
        </Grid>
        {count === 0 && (
          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              width: "100%",
              textAlign: "center",
              mt: "5%",
              fontWeight: "bold",
            }}
          >
            No {COLLECTION_TYPES[collectionTabIndex]} collection!
          </Typography>
        )}
        {(count ?? 0) > 24 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Pagination
              color="primary"
              sx={(theme) => ({
                position: "absolute",
                zIndex: 100,
                top: isUpMd ? undefined : 32,
                bottom: isUpMd ? 5 : undefined,
                borderRadius: "9999px",
                display: "flex",
                backgroundColor: `${theme.palette.background.default}88`,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mt: 1.5,
                padding: 0.5,
              })}
              page={collectionPage}
              count={Math.ceil(count / 24)}
              onChange={handlePageChange}
              size="small"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default EditRoomCollectionsList;
