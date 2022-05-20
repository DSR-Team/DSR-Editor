import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import CollectionListItem from "../components/CollectionListItem";
import { getCollections } from "../utils/axios";

const testCollections = [
  {
    tokenId: 6797,
    creators: [
      "tz1i6vLtcrBbPw8PsfsNqnqjNdy6xyzChiao",
      "tz1UY7PqYfnFQoywjS4rzo639UqTUuysBALA",
    ],
    aliases: ["", ""],
    name: "滴水穿石 Like a river carves a canyon",
    description:
      "世界和平，\n像是遙不可及的龐大議題，\n\n但只要每個人持續地，\n用自己的方式而努力，\n\n就像滴水穿石，\n最終團結的力量終將能改變，\n一起迎接多元色彩的世界吧 !\n\n可以利用滑鼠與作品互動\n\n\nWorld Peace.\nIt seems like a huge, unattainable issue.\n\nBut as long as each person continues to\nIn his or her own way\n\nLike a drop of water penetrating a stone\nIn the end, the power of unity can change.\nLet's welcome the multi-colored world together!\n\n\nYou can interact with the artwork by clicking your mouse.\n",
    mimeType: "application/x-directory",
    tags: ["LIKEWATER22", "WORLDPEACE", "EARTHDAY"],
    artifactUri:
      "https://assets.akaswap.com/ipfs/QmXMvo6h5VJfCkLoYALtibscro11DcjN5MTubk9grpy582",
    displayUri:
      "https://assets.akaswap.com/ipfs/QmVbHWbNXK7nvgQAtoDdkwRhAJBbLmYAK9nRRG2poCqzkq",
    thumbnailUri:
      "https://assets.akaswap.com/ipfs/QmVbHWbNXK7nvgQAtoDdkwRhAJBbLmYAK9nRRG2poCqzkq",
    latestSoldPrice: 1000000,
  },
  {
    tokenId: 6797,
    creators: [
      "tz1i6vLtcrBbPw8PsfsNqnqjNdy6xyzChiao",
      "tz1UY7PqYfnFQoywjS4rzo639UqTUuysBALA",
    ],
    aliases: ["", ""],
    name: "滴水穿石 Like a river carves a canyon",
    description:
      "世界和平，\n像是遙不可及的龐大議題，\n\n但只要每個人持續地，\n用自己的方式而努力，\n\n就像滴水穿石，\n最終團結的力量終將能改變，\n一起迎接多元色彩的世界吧 !\n\n可以利用滑鼠與作品互動\n\n\nWorld Peace.\nIt seems like a huge, unattainable issue.\n\nBut as long as each person continues to\nIn his or her own way\n\nLike a drop of water penetrating a stone\nIn the end, the power of unity can change.\nLet's welcome the multi-colored world together!\n\n\nYou can interact with the artwork by clicking your mouse.\n",
    mimeType: "application/x-directory",
    tags: ["LIKEWATER22", "WORLDPEACE", "EARTHDAY"],
    artifactUri:
      "https://assets.akaswap.com/ipfs/QmXMvo6h5VJfCkLoYALtibscro11DcjN5MTubk9grpy582",
    displayUri:
      "https://assets.akaswap.com/ipfs/QmVbHWbNXK7nvgQAtoDdkwRhAJBbLmYAK9nRRG2poCqzkq",
    thumbnailUri:
      "https://assets.akaswap.com/ipfs/QmVbHWbNXK7nvgQAtoDdkwRhAJBbLmYAK9nRRG2poCqzkq",
    latestSoldPrice: 1000000,
  },
  {
    tokenId: 6797,
    creators: [
      "tz1i6vLtcrBbPw8PsfsNqnqjNdy6xyzChiao",
      "tz1UY7PqYfnFQoywjS4rzo639UqTUuysBALA",
    ],
    aliases: ["", ""],
    name: "滴水穿石 Like a river carves a canyon",
    description:
      "世界和平，\n像是遙不可及的龐大議題，\n\n但只要每個人持續地，\n用自己的方式而努力，\n\n就像滴水穿石，\n最終團結的力量終將能改變，\n一起迎接多元色彩的世界吧 !\n\n可以利用滑鼠與作品互動\n\n\nWorld Peace.\nIt seems like a huge, unattainable issue.\n\nBut as long as each person continues to\nIn his or her own way\n\nLike a drop of water penetrating a stone\nIn the end, the power of unity can change.\nLet's welcome the multi-colored world together!\n\n\nYou can interact with the artwork by clicking your mouse.\n",
    mimeType: "application/x-directory",
    tags: ["LIKEWATER22", "WORLDPEACE", "EARTHDAY"],
    artifactUri:
      "https://assets.akaswap.com/ipfs/QmXMvo6h5VJfCkLoYALtibscro11DcjN5MTubk9grpy582",
    displayUri:
      "https://assets.akaswap.com/ipfs/QmVbHWbNXK7nvgQAtoDdkwRhAJBbLmYAK9nRRG2poCqzkq",
    thumbnailUri:
      "https://assets.akaswap.com/ipfs/QmVbHWbNXK7nvgQAtoDdkwRhAJBbLmYAK9nRRG2poCqzkq",
    latestSoldPrice: 1000000,
  },
];

const Collections = () => {
  const [collections, setCollections] = useState(testCollections);
  const fetchCollections = async () => {
    const collections = await getCollections();
    console.log(collections);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

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
        padding: "36px 24px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Grid container direction="row" sx={{ margin: "auto" }}>
        {collections?.map((collection, i) => (
          <Grid key={`collection_${i}`} {...gridProps}>
            <CollectionListItem collection={collection} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Collections;
