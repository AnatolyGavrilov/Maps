import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getUsersThunk } from "modules/Users/services";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  console.log("users", users);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  return <div>Страница юзеров</div>;
};

export default Users;
