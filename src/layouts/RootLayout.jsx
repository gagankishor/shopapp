import { Grid, GridItem } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

// components
import Navbar from "../components/Navbar"
// import Sidebar from "../components/Sidebar"

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(1, 1fr)" bg="#d9d9d9">
      <GridItem
        bg="#d9d9d9"
        as="main"
        colSpan={{ base: 6, lg: 6, xl: 6 }} 
        p="10px"
        color={"#778da9"}
        marginLeft={{ base: 0, lg: 0 }}
        minHeight={"100vh"}
        // marginTop={{ base: 0, lg: "80px" }} // Add margin-top to create space for the fixed sidebar
      >
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  )
}