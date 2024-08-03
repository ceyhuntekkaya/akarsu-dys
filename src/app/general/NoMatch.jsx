import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function NoMatch() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return <div>NoMatch</div>;
}
