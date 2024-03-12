import { FC } from "react";

import { IPublicationsProps } from "./Publications.types";
import PublicationCard from "../PublicationCard/PublicationCard";
import styles from "./styles.module.scss";

const PublicationsList: FC<IPublicationsProps> = ({ publications }) => {
  return (
    <div>
      <div className={styles.cardsList}>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
