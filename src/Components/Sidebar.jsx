import { Button, Stack } from "@mui/material";

import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",  
      scrollbarWidth: "none",  /* Firefox */
      height: { sx: 'auto', md: '90%' },
      flexDirection: { md: 'column' }
    }}
  >
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && 'gainsboro', color: 'black'
        }}
        key = {category.name}
      >
        <span style={{ color: 'black', marginRight: '5px' }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>
          {category.name}
        </span>
      </button>
    ))}

  </Stack>
)

export default Sidebar