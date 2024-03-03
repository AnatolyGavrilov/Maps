import { FC } from "react";
import { renderToString } from "react-dom/server";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { IUserMapProps } from "./UsersMap.types";
import styles from "./styles.module.scss";

const UsersMap: FC<IUserMapProps> = ({ users }) => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  return (
    <div className={styles.mapContainer}>
      <h1>Карта пользователей</h1>
      <YMaps>
        <Map defaultState={defaultState} width={1640} height={700}>
          {users.map((user) => (
            <Placemark
              key={user.id}
              defaultGeometry={[user.address.geo.lat, user.address.geo.lng]}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default UsersMap;
