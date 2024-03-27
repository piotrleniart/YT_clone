import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {

  const [videos, setVideos] = useState([])
  const { searchTerm } = useParams();

  useEffect(() => {
    (async() => {
      const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
      setVideos(data.items);
    })();
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'black' }}>
        Search results for: <span style={{ color: '#bbb' }}>{ searchTerm }</span> videos
      </Typography>

      <Videos videos={[videos][0]} />
    </Box>
  )
}

export default SearchFeed