import { FC } from "react";

import { IPublicationsProps } from "./PublicationList.types";
import styles from "./styles.module.scss";
import { PublicationCard } from "../PublicationCard";

export const PublicationList: FC<IPublicationsProps> = ({
  publications,
  userId,
}) => {
  return (
    <div className={styles.cardsList}>
      {publications.map((publication) => (
        <PublicationCard
          key={publication.id}
          publication={publication}
          userId={userId}
        />
      ))}
    </div>
  );
};
