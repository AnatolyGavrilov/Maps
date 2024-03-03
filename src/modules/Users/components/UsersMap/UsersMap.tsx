import { FC } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
const UsersMap: FC<any> = ({ users }) => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  return (
    <div>
      <h1>Карта пользователей</h1>
      <YMaps>
        <Map defaultState={defaultState}>
          <Placemark geometry={[55.684758, 37.738521]} />
        </Map>
      </YMaps>
    </div>
  );
};

export default UsersMap;
