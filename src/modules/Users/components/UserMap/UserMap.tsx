import { FC } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { IUserMapProps } from "./UserMap.types";
import styles from "./styles.module.scss";

const MapState = {
  center: [55.751574, 37.573856],
  zoom: 5,
};

export const UserMap: FC<IUserMapProps> = ({ users }) => {
  return (
    <div className={styles.mapContainer}>
      <h1>Карта пользователей</h1>
      <YMaps>
        <Map defaultState={MapState} width={1640} height={700}>
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
