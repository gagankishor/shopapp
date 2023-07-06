import { List, ListItem, ListIcon, Box, Heading } from "@chakra-ui/react"
import { CalendarIcon, EditIcon} from '@chakra-ui/icons'
import { NavLink } from "react-router-dom"


export default function Sidebar() {
  return (<>
      <Box color="white" mb={10}>
        <Heading>MY BLOG APP</Heading>
      </Box><hr/>
    <List color="white" fontSize="1.2em" mt={10} spacing={4}>
      
      <ListItem>
        <NavLink to="/">
          <ListIcon as={CalendarIcon} color="white" />
          Dashboard
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="create">
          <ListIcon as={EditIcon} color="white" />
          New  BLOG
        </NavLink>
      </ListItem>
      {/* <ListItem>
        <NavLink to="questioncreate">
          <ListIcon as={EditIcon} color="white" />
          New Question
        </NavLink>
      </ListItem> */}
      {/* <ListItem>
        <NavLink to="profile">
          <ListIcon as={AtSignIcon} color="white" />
          Profile
        </NavLink>
        </ListItem> */}
        
        {/* <ListItem>
        <NavLink to="register">
          <ListIcon as={SmallAddIcon} color="white" />
          Register
        </NavLink>
      </ListItem> */}
      
    </List></>
  )
}
