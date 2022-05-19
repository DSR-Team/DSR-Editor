import { Grid, Box } from "@mui/material";
import { useEffect } from "react";
import { getCollections } from "../utils/axios";

const Collections = () => {
  const fetchCollections = async () => {
    const collections = await getCollections();
    console.log(collections);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <Box
      sx={{
        padding: "36px 24px",
        boxSizing: "border-box",
        width: "100%",
      }}
    ></Box>
  );
};

export default Collections;
