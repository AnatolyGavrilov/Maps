import { FC } from "react";

import { IPublicationsProps } from "./Publications.types";
import PublicationCard from "../PublicationCard/PublicationCard";
import styles from "./styles.module.scss";

const PublicationsList: FC<IPublicationsProps> = ({ publications, userId }) => {
  return (
    <div>
      <div className={styles.cardsList}>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
