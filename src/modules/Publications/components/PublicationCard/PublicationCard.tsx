import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./styles.module.scss";

import cardImage from "assets/images/like.jpg";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import {
  DELETE_PUBLICATION,
  GET_PUBLICATIONS,
  UPDATE_PUBLICATION,
} from "api/publications/publications";
import { IPublicationsCache } from "pages/Publications/Publications.types";

const PublicationsList: FC<any> = ({ publication, userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [updatePost] = useMutation(UPDATE_PUBLICATION);
  const [deletePublication] = useMutation(DELETE_PUBLICATION, {
    update(cache) {
      const publicationsCache = cache.readQuery<IPublicationsCache>({
        query: GET_PUBLICATIONS,
        variables: { userId },
      });

      publicationsCache &&
        cache.writeQuery({
          query: GET_PUBLICATIONS,
          data: {
            user: {
              posts: {
                data: [
                  ...publicationsCache?.user.posts.data.filter(
                    (curr) => curr.id !== publication.id
                  ),
                ],
              },
            },
          },
          variables: { userId },
        });
    },
  });

  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };

  const bodyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e?.target?.value);
  };
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    console.log("я зашел 1 раз");
    e.preventDefault();
    updatePost({
      variables: {
        id: publication.id,
        input: { title: title, body: body },
      },
    });
    handleModal();
    setTitle("");
    setBody("");
  };

  const handleClickToDeletePost = async () => {
    await deletePublication({
      variables: {
        id: publication.id,
      },
    });
  };

  return (
    <Card className={styles.card}>
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
          className={styles.body}
        >
          {publication.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleModal}>
          Редактировать
        </Button>
        <Button size="small" onClick={handleClickToDeletePost}>
          Удалить
        </Button>
      </CardActions>
      <Modal open={openModal} onClose={handleModal}>
        <div className={styles.modal}>
          <form onSubmit={sendForm}>
            <p className={styles.modalTitle}>Изменение публикации</p>
            <div className={styles.fields}>
              <TextField
                value={title}
                onChange={titleHandler}
                label="Введите название"
                variant="outlined"
              />
              <TextField
                value={body}
                onChange={bodyHandler}
                label="Введите контент"
                variant="outlined"
              />
            </div>
            <Button
              type="submit"
              className={styles.changePublicationButton}
              variant="contained"
            >
              Изменить
            </Button>
          </form>
        </div>
      </Modal>
    </Card>
  );
};

export default PublicationsList;
