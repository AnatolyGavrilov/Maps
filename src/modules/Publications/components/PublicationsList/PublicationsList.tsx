import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./styles.module.scss";

import cardImage from "../../../../assets/images/like.jpg";
import { IPublicationsProps } from "./Publications.types";
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
import PublicationCard from "../PublicationCard/PublicationCard";

const PublicationsList: FC<IPublicationsProps> = ({ publications }) => {
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
    <div>
      <div className={styles.cardsList}>
        {publications.map((publication) => (
          <PublicationCard publication={publication} />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
