import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { IUserListProps } from "./UserList.types";
import { ListItemText } from "@mui/material";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export const UsersList: FC<IUserListProps> = ({ users }) => {
  const navigate = useNavigate();

  const handleClickNavigateToPublications = (id: string) => {
    navigate(`publications/${id}`);
  };

  return (
    <div>
      <h1>Список пользователей</h1>
      <List>
        {users.map((user) => (
          <ListItem
            onClick={(e) => handleClickNavigateToPublications(user.id)}
            key={user.id}
            className={styles.item}
          >
            <ListItemText className={styles.itemText}>
              {user?.name} {user?.username}
            </ListItemText>
            <ListItemText className={styles.itemText}>
              {user?.email}
            </ListItemText>
            <ListItemText className={styles.itemText}>
              {user?.phone}
            </ListItemText>
            <ListItemText className={styles.itemText}>
              {user?.address?.city} {user?.address?.street} {user?.address?.suite}
            </ListItemText>
            <ListItemText className={styles.itemText}>
              {user?.company?.name} {user?.company?.catchPhrase} {user?.company?.bs}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

