import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getUsersThunk } from "modules/Users/services";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  console.log("users", users.users.data);

  return <div>Страница юзеров</div>;
};

export default Users;
