import {
  Grid,
  Box,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CollectionListItem from "../components/CollectionListItem";
import { getCollections } from "../utils/axios";

const Collections = () => {
  const [collections, setCollections] = useState();
  const [count, setCount] = useState();

  const numPerPage = 24;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  useEffect(() => {
    const offset = (page - 1) * numPerPage;

    setCollections(Array.from({ length: numPerPage }, () => ({})));

    const fetchCollections = async () => {
      const { tokens: collections, count } = await getCollections({
        offset,
      });
      setCollections(collections);
      setCount(count);
    };
    fetchCollections();
  }, [page]);

  const gridProps = {
    item: true,
    container: true,
    direction: "row",
    justifyContent: "center",
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: "36px 24px",
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container direction="row" sx={{ margin: "auto" }}>
        {collections?.map((collection, i) => (
          <Grid key={`collection_${i}`} {...gridProps}>
            <CollectionListItem collection={collection} />
          </Grid>
        ))}
      </Grid>
      {count === 0 && (
        <Typography
          variant="h2"
          color="text.primary"
          sx={{ textAlign: "center", mt: "5%", fontWeight: "bold" }}
        >
          You don't have any collection!
        </Typography>
      )}
      {(count ?? 0) > numPerPage && (
        <Pagination
          color="primary"
          sx={(theme) => ({
            position: "sticky",
            bottom: 20,
            borderRadius: "9999px",
            display: "flex",
            backgroundColor: `${theme.palette.background.default}88`,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            mt: 1.5,
            padding: 1,
          })}
          page={page}
          count={Math.ceil(count / numPerPage)}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      )}
    </Box>
  );
};

export default Collections;
