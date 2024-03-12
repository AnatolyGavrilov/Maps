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
import {
  DELETE_PUBLICATION,
  UPDATE_PUBLICATION,
} from "api/publications/publications";

const PublicationsList: FC<any> = ({ publication }) => {
  const [openModal, setOpenModal] = useState(false);
  const [updatePost] = useMutation(UPDATE_PUBLICATION);
  const [deletePost, { data }] = useMutation(DELETE_PUBLICATION);
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

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost({
      variables: {
        id: publication.id,
        input: { title: title, body: body },
      },
    });
    handleModal();
  };

  const handleClickToDeletePost = () => {
    deletePost({
      variables: {
        id: publication.id,
      },
    });
    console.log("deletedData", data);
  };
  // console.log("puclication id ", publication.id);
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Button size="small" onClick={handleClickToDeletePost}>
          Удалить
        </Button>
      </CardActions>
      <Modal open={openModal} onClose={handleModal}>
        <div className={styles.modal}>
          <form onSubmit={sendForm}>
            <p>Редактировать публикацию</p>
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
            <button className={styles.formButton}>Редактировать</button>
          </form>
        </div>
      </Modal>
    </Card>
  );
};

export default PublicationsList;
