import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import UserList from "modules/Users/components/UsersList/UsersList";
import { getUsersThunk } from "modules/Users/services";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  console.log("users", users);

  return (
    <div>
      Страница юзеров
      <UserList users={users} />
    </div>
  );
};

export default Users;
