import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { IUserListProps } from "./UserList.types";
import { ListItemText } from "@mui/material";
import styles from "./test.module.scss";

const UserList: FC<IUserListProps> = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemText>{user.name} </ListItemText>
          <ListItemText>{user.email} </ListItemText>
          <ListItemText>{user.address.city} </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
