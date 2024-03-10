import { FormControlLabel, Switch } from "@mui/material";
import UserList from "modules/Users/components/UsersList/UsersList";
import UsersMap from "modules/Users/components/UsersMap/UsersMap";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "api/users/users";

const Users = () => {
  const [isMap, setIsMap] = useState<boolean>(false);
  const { loading, data } = useQuery(GET_USERS);
  const users = data?.users?.data;
  const handleClickToSwitch = () => {
    setIsMap(!isMap);
  };

  const FormControlLabelValue = isMap ? "Карта" : "Список";

  return (
    <div>
      {!loading && (
        <div>
          <FormControlLabel
            control={<Switch />}
            label={FormControlLabelValue}
            onClick={handleClickToSwitch}
          />
          {isMap ? <UsersMap users={users} /> : <UserList users={users} />}
        </div>
      )}
    </div>
  );
};

export default Users;
