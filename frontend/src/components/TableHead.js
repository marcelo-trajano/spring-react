import React from "react";

class TableHead extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
            return <th key={column}>{column}</th>;
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
