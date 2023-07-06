import { Grid, GridItem } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

// components
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(4, 1fr)" bg="#0d1b2a">
      
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }} 
        bg="#1b263b"
        minHeight={{ lg: '100vh' }}
        p={{ base: '20px', lg: '30px' }}
        color={"#415a77"}
        position="fixed" // Set the position to "fixed"
        top={0} // Position it at the top of the viewport
        left={0} // Position it at the left of the viewport
        zIndex={999} // Set a high z-index value to ensure it appears above other elements
      >
        <Sidebar />
      </GridItem>

      <GridItem
        bg="#415a77"
        as="main"
        colSpan={{ base: 6, lg: 4, xl: 5 }} 
        p="40px"
        color={"#778da9"}
        marginLeft={{ base: 0, lg: "300px" }}
        minHeight={"100vh"}
        // marginTop={{ base: 0, lg: "80px" }} // Add margin-top to create space for the fixed sidebar
      >
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  )
}