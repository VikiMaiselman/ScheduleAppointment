import React from "react";
import { Link } from "react-router-dom";

import useProcedures from "../hooks/procedures";

export default function Procedures() {
  const [procedures, getProcedures, createProcedure] = useProcedures();

  React.useEffect(() => {
    getProcedures();
  }, []);

  const handleClick = (e) => [createProcedure("test2", 150, 3)];

  return (
    <>
      <h1>Procedures</h1>
      <ul>
        {procedures &&
          React.Children.toArray(
            procedures.map((p) => (
              <li>
                <Link
                  to={`/create-reservation/${p._id}`}
                  state={{ name: p.name, duration: p.slotsTakes * 15, price: p.price }}
                >
                  <h1>{p.name}</h1>
                  <p>{p.price}₪</p>
                  <p>{p.slotsTakes * 15} min</p>
                </Link>
              </li>
            ))
          )}
      </ul>
      <button onClick={handleClick}>Create Procedure</button>
    </>
  );
}
