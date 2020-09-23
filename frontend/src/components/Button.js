import React from "react";

class Button extends React.Component {
  render() {
    return (
      <button
        className={`btn waves-effect waves-light ${
          this.props.btnPosition ? this.props.btnPosition : ""
        }`}
        type="submit"
        name="action"
      >
        {this.props.btnName}
        <i
          className={`material-icons  ${
            this.props.iconBtnPosition ? this.props.iconBtnPosition : ""
          }`}
        >
          {this.props.icon}
        </i>
      </button>
    );
  }
}

export default Button;
