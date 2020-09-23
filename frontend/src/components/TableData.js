import React from "react";
import TableDataRoll from "./TableDataRoll";

class TableData extends React.Component {
  render() {
    return this.props.list.map((user) => {
      return (
        <TableDataRoll
          key={user.id}
          item={user}
          edit={this.props.edit}
          delete={this.props.delete}
        />
      );
    });
  }
}

export default TableData;
