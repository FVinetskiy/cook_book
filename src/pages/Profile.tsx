import { useSelector } from "react-redux/es/hooks/useSelector";
import { userState } from "../app/redux/slices/authSlice";
import { List } from "@consta/uikit/ListCanary";
import { FC } from "react";

const Profile: FC = () => {
  const { user } = useSelector(userState);

  const emailVerified = user?.emailVerified ? "подтверждён" : "не подтверждён";
  const phoneNumber = user?.phoneNumber ? user?.phoneNumber : "отсутсвует";
  const displayName = user?.displayName ? user?.displayName : "отсутсвует";

  type Item = {
    label: string;
    id: number;
  };

  const items: Item[] = [
    {
      label: `Verified : ${emailVerified}`,
      id: 1,
    },
    {
      label: `Phone number : ${phoneNumber}`,
      id: 2,
    },
    {
      label: `Name : ${displayName}`,
      id: 3,
    },
  ];

  return (
    <div>
      <h1 style={{ margin: "20px 0" }}>Profile</h1>
      <List items={items} />
    </div>
  );
};

export default Profile;
