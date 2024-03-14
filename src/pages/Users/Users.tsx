import { FormControlLabel, Switch } from "@mui/material";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "api/users/users";
import { UsersList } from "modules/Users/components/UserList";
import { UserMap } from "modules/Users/components/UserMap";

const Users = () => {
  const [isMap, setIsMap] = useState(false);
  const { loading, data } = useQuery(GET_USERS);
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
          {isMap ? (
            <UserMap users={data?.users?.data} />
          ) : (
            <UsersList users={data?.users?.data} />
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
