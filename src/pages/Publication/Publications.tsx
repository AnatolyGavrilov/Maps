import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import PublicationsList from "modules/Publications/components/PublicationsList/PublicationsList";
import { getPublicationsThunk } from "modules/Publications/services";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Publications = () => {
  const dispatch = useAppDispatch();
  const publications = useAppSelector(
    (state) => state.publications.publications
  );
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getPublicationsThunk(userId));
  }, []);

  return (
    <div>
      <PublicationsList publications={publications} />
    </div>
  );
};

export default Publications;
