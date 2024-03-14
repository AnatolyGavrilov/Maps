import { CircularProgress, FormControlLabel, Switch } from "@mui/material";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "api/users/users";
import { UsersList } from "modules/Users/components/UserList";
import { UserMap } from "modules/Users/components/UserMap";
import styles from "./styles.module.scss";
const Users = () => {
  const [isMap, setIsMap] = useState(false);
  const { loading, data } = useQuery(GET_USERS);
  const handleClickToSwitch = () => {
    setIsMap(!isMap);
  };

  const FormControlLabelValue = isMap ? "Карта" : "Список";

  const currentList = useMemo(() => {
    if (isMap) return <UserMap users={data?.users?.data} />;
    return <UsersList users={data?.users?.data} />;
  }, [isMap, data?.users?.data]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <FormControlLabel
        control={<Switch />}
        label={FormControlLabelValue}
        onClick={handleClickToSwitch}
      />
      {currentList}
    </div>
  );
};

export default Users;
