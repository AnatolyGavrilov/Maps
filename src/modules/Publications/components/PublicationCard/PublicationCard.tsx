import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./styles.module.scss";

import cardImage from "../../../../assets/images/like.jpg";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_PUBLICATION } from "api/publications/publications";

const PublicationsList: FC<any> = ({ publication }) => {
  const [openModal, setOpenModal] = useState(false);
  const [updatePost, { data }] = useMutation(UPDATE_PUBLICATION);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };

  const bodyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e?.target?.value);
  };
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const sendForm = (publicationId: string, e: FormEvent<HTMLFormElement>) => {
    console.log("id", publicationId);
    e.preventDefault();
    updatePost({
      variables: {
        id: publicationId,
        input: { title: title, body: body },
      },
    });
    handleModal();
  };

  return (
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
        <Button size="small" onClick={handleModal}>
          Редактировать
        </Button>
        <Button size="small">Удалить</Button>
      </CardActions>
      <Modal open={openModal} onClose={handleModal}>
        <div className={styles.formWrapper}>
          <form onSubmit={(e) => sendForm(publication.id, e)}>
            <p>Создать публикацию</p>
            <input
              value={title}
              onChange={titleHandler}
              className={styles.titleField}
            ></input>
            <input
              value={body}
              onChange={bodyHandler}
              className={styles.bodyField}
            ></input>
            <button className={styles.formButton}>Создать</button>
          </form>
        </div>
      </Modal>
    </Card>
  );
};

export default PublicationsList;
