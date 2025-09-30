import PropTypes from "prop-types";
import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

class ContactInput extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      name: "",
      tag: "",
    };

    this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
    this.onTagChangeEventHandler = this.onTagChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onNameChangeEventHandler(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }

  onTagChangeEventHandler(event) {
    this.setState(() => {
      return {
        tag: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addContact(this.state);
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <form
              className="contact-input"
              onSubmit={this.onSubmitEventHandler}
            >
              <input
                type="text"
                placeholder={locale === "id" ? "Nama" : "Name"}
                value={this.state.name}
                onChange={this.onNameChangeEventHandler}
              />
              <input
                type="text"
                placeholder={locale === "id" ? "Tag" : "Tag"}
                value={this.state.tag}
                onChange={this.onTagChangeEventHandler}
              />
              <button type="submit">
                {locale === "id" ? "Tambah" : "Add"}
              </button>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ContactInput.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactInput;
