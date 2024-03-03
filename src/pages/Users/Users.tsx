import { FormControlLabel, Switch } from "@mui/material";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import UserList from "modules/Users/components/UsersList/UsersList";
import UsersMap from "modules/Users/components/UsersMap/UsersMap";
import { getUsersThunk } from "modules/Users/services";
import { useEffect, useState } from "react";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const [isMap, setIsMap] = useState<boolean>(false);

  const handleClickToSwitch = () => {
    setIsMap(!isMap);
  };

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  console.log("users", users);

  const FormControlLabelValue = isMap ? "Карта" : "Список";

  return (
    <div>
      <FormControlLabel
        control={<Switch />}
        label={FormControlLabelValue}
        onClick={handleClickToSwitch}
      />
      {isMap ? <UsersMap users={users} /> : <UserList users={users} />}
    </div>
  );
};

export default Users;
