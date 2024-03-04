import { FC } from "react";
import styles from "./styles.module.scss";

import cardImage from "../../../../assets/images/like.jpg";
import { IPublicationsProps } from "./Publications.types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const PublicationsList: FC<IPublicationsProps> = ({ publications }) => {
  // console.log("publications", publications);
  return (
    <div>
      <h1>Публикации пользователя</h1>
      <div className={styles.cardsList}>
        {publications.map(() => (
          <Card sx={{ maxWidth: 345 }}>
            <img src={cardImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
