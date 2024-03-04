import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import PublicationsList from "modules/Publications/components/PublicationsList/PublicationsList";
import { getPublicationsThunk } from "modules/Publications/services";
import { useEffect } from "react";

const Publications = () => {
  const dispatch = useAppDispatch();
  const publications = useAppSelector((state) => state.publications);

  useEffect(() => {
    dispatch(getPublicationsThunk());
  }, []);

  console.log(publications);
  return <div><PublicationsList publications={publications}/></div>;
};

export default Publications;
