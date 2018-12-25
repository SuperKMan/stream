import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

export class StreamForm extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <dir className="header">{error}</dir>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "erroe" : ""}`;
    return (
      <div className={className}>
        <label htmlFor="">{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter the title";
  }

  if (!formValues.description) {
    errors.description = "You must enter the description";
  }

  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
