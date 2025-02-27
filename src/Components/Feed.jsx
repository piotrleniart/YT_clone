import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([])

  useEffect(() => {
    setVideos(null);

    (async() => {
      const data = await fetchFromAPI(`search?part=snippet&q=${selectedCategory}`);
      setVideos(data.items);
    })()
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid #bbb', px: { sx: 0, md: 2 } }}>
        <Sidebar 
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
        />

        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#aaa' }}>
          Copyright 2024 PL
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color : 'black' }}>
          {selectedCategory} <span style={{ color: 'grey'}}>videos</span>
        </Typography>

        <Videos videos={[videos][0]}/>
      </Box>
    </Stack>
  )
}

export default Feed