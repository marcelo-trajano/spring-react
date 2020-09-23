import React from "react";

class TableDataRoll extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.email}</td>
        <td>{this.props.item.password}</td>
        <td>
          <button
            onClick={(e) => {
              this.props.edit(this.props.item.id);
            }}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            <i className="material-icons">edit</i>
          </button>
        </td>
        <td>
          <button
            onClick={(e) => {
              this.props.delete(this.props.item.id);
            }}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    );
  }
}

export default TableDataRoll;
