import { Button } from "@consta/uikit/Button";
import { Responses404 } from "@consta/uikit/Responses404";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleMove = () => {
    navigate("/");
  };

  return (
    <div style={{ paddingTop: "60px" }}>
      <Responses404 actions={<Button onClick={handleMove} size="m" view="ghost" label="На главную" />} />
    </div>
  );
};

export default NotFound;
