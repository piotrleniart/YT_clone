import { Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from '../utils/constants';
import SearchBar from "./SearchBar";

const Navbar = () => (
  <Stack 
    direction="row" 
    alignItems="center" 
    p={2} 
    sx={{ position: 'sticky', background: '#fff', top: 0, justifyContent: 'space-between', zIndex: 1 }}
  >
    <Link to="/" style={{ display: 'flex', alignItems: 'center'}}>
      <img src={logo} alt="logo" height={55} />
    </Link>
    <SearchBar />
    <Box></Box>
  </Stack>
)

export default Navbar