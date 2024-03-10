import { FC } from "react";
import styles from "./styles.module.scss";

import cardImage from "../../../../assets/images/like.jpg";
import { IPublicationsProps } from "./Publications.types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const PublicationsList: FC<IPublicationsProps> = ({ publications }) => {
  return (
    <div>
      <div className={styles.cardsList}>
        {publications.map((publication) => (
          <Card sx={{ maxWidth: 345 }} key={publication.id}>
            <img className={styles.image} src={cardImage} alt="mountins" />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.title}
              >
                {publication.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.title}
              >
                {publication.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Редактировать</Button>
              <Button size="small">Удалить</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
