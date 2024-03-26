import React from "react";
import axios from "axios";

import { url, headers } from "../util/configs";

export default function useProcedures() {
  const [procedures, setProcedures] = React.useState();

  const getProcedures = async () => {
    const response = await axios.get(`${url}/procedures`, { withCredentials: true }, headers);
    const procedures = response.data;
    setProcedures(procedures);
    console.log(procedures);
  };

  const createProcedure = async (name, price, slotsTakes) => {
    const response = await axios.post(
      `${url}/admin/procedures`,
      { name: name, price: price, slotsTakes: slotsTakes },
      { withCredentials: true },
      headers
    );
    console.log(response);
    await getProcedures();
  };

  return [procedures, getProcedures, createProcedure];
}
