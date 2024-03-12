import { Button, Modal } from "@mui/material";
import PublicationsList from "modules/Publications/components/PublicationsList/PublicationsList";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GET_PUBLICATIONS,
  ADD_PUBLICATION,
} from "api/publications/publications";
import {
  ApolloCache,
  DefaultContext,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  ICreatePostResponse,
  IPublicationsCache,
  IVariables,
} from "./Publications.types";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./styles.module.scss";
export const Publications: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };

  const bodyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e?.target?.value);
  };

  const { userId } = useParams();

  const { loading, data } = useQuery(GET_PUBLICATIONS, {
    variables: { userId },
  });

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
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
  };

  const [addPublication] = useMutation<
    ICreatePostResponse,
    IVariables,
    DefaultContext,
    ApolloCache<IPublicationsCache>
  >(ADD_PUBLICATION, {
    update(cache, { data }) {
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
                  //  id: Math.random() * 10 ---> Добавлено т.к бэк при создании новой сущнсоти всегда возвращает один и тот же id,
                  // при этом не дает прокинуть id.
                  { ...data?.createPost, id: Math.random() * 10 },
                  ...publicationsCache?.user.posts.data,
                ],
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

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          <h1>Публикации пользователя:</h1>
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
      <Modal open={openModal} onClose={handleModal}>
        <div className={styles.formWrapper}>
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
        </div>
      </Modal>
    </div>
  );
};
