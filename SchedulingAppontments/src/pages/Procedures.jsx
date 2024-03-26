import React from "react";
import axios from "axios";

import { url, headers } from "../util/configs";

export default function Procedures() {
  const [procedures, setProcedures] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/procedures`, { withCredentials: true }, headers);
      const procedures = response.data;
      setProcedures(procedures);
      console.log(procedures);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Procedures</h1>
      <ul>{procedures && React.Children.toArray(procedures.map((p) => <li>{p.name}</li>))}</ul>
    </>
  );
}
