import React from "react";

class InputAutocomplete extends React.Component {
  render() {
    return (
      <React.Fragment>
        <i className="material-icons prefix">{this.props.iconName}</i>
        <input
          id={this.props.id}
          type={this.props.type}
          className="autocomplete"
          onChange={(e) => {
            this.props.updateValue(e.target.value);
          }}
          value={this.props.value}
        />
        <label htmlFor={this.props.id}>{this.props.labelName}</label>
      </React.Fragment>
    );
  }
}

export default InputAutocomplete;
