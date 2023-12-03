import { SnackBar } from "@consta/uikit/SnackBar";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationsSelectors, remove } from "../../app/redux/slices/notificationsSlice";
import "./SnackBar.scss";

const NotificationMessage: FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(notificationsSelectors);

  const handleItemOnClose = (item: any) => {
    dispatch(remove(item.key));
  };

  const getItemAutoCloseTimeout = (item: any) => item.autoClose || 4;
  const getItemShowProgress = (item: any) => item.showProgress || "line";

  const getItemActions = (item: any) => {
    if (Array.isArray(item.actions)) {
      return item.actions.map((button: any) => ({
        label: button.label,
        onClick: button.onClick,
      }));
    }
    return undefined;
  };

  return (
    <SnackBar
      className="SnackBar"
      items={items}
      onItemClose={handleItemOnClose}
      onItemAutoClose={handleItemOnClose}
      getItemAutoClose={getItemAutoCloseTimeout}
      getItemShowProgress={getItemShowProgress}
      getItemActions={getItemActions}
    />
  );
};

export default NotificationMessage;
