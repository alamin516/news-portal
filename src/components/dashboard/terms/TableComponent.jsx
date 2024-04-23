import React from "react";
import { Table, Button } from "react-bootstrap";

const TableComponent = ({ terms, policy, handleEditClick }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {policy.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.type}</td>
            <td>
              <Button variant="primary" onClick={() => handleEditClick(item.long_des, item.id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
        {terms.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.type}</td>
            <td>
              <Button variant="primary" onClick={() => handleEditClick(item.long_des, item.id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
