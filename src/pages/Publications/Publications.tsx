import { Box, Button, Modal } from "@mui/material";
import PublicationsList from "modules/Publications/components/PublicationsList/PublicationsList";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  GET_PUBLICATIONS,
  ADD_PUBLICATION,
} from "api/publications/publications";
import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import { MuiSxStyle } from "./MuiSxStyles";
import { IPublicationsCache } from "./Publications.types";

const Publications = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };
  const bodyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e?.target?.value);
  };

  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_PUBLICATIONS, {
    variables: { userId },
  });

  function sendForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addPublication({
      variables: {
        input: {
          title: title,
          body: body,
        },
      },
    });
    handleModal();
  }

  const [addPublication] = useMutation(ADD_PUBLICATION, {
    update(cache: ApolloCache<IPublicationsCache | null>, { data: { createPost } }) {
      const publicationsCache: IPublicationsCache | null = cache.readQuery({
        query: GET_PUBLICATIONS,
        variables: { userId },
      });
      console.log("publicationsCache", publicationsCache);
      publicationsCache && cache.writeQuery({
        query: GET_PUBLICATIONS,
        data: {
          user: {
            posts: {
              data: [createPost, ...publicationsCache?.user.posts.data],
            },
          },
        },
        variables: { userId },
      });
    },
  });

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
      {!loading && (
        <div>
          <div className={styles.wrapper}>
            <h1>Публикации пользователя</h1>
            <Button
              onClick={handleModal}
              className={styles.addPublicationButton}
              variant="contained"
            >
              Добавить публикацию
            </Button>
          </div>
          <PublicationsList publications={data?.user?.posts?.data} />
        </div>
      )}
      <Modal
        open={openModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MuiSxStyle}>
          <form onSubmit={sendForm}>
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
        </Box>
      </Modal>
    </div>
  );
};

export default Publications;
