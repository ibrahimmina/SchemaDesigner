/**
 * @flow
 */
import React, { Component } from "react";
import Modal from "react-bootstrap/lib/Modal";
import type { DBType } from "../../utils/flowtypes";
import shallowEqual from "../../utils/shallowEqual";

type Props = {
  name: string,
  editdata: DBType,
  showModal: boolean,
  editMode: boolean,
  saveDbName: (
    name: string,
    db_user: string,
    data: DBType,
    editMode: boolean
  ) => void,
  toggleDbModal: () => void
};

class DbModal extends Component<Props> {
  // Flow type for ref
  dbname: any;
  db_user: any;
  db_password: any;
  machine_User: any;
  machine_Password: any;
  dst_Directory: any;

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const name = this.dbname.value.trim().toLowerCase();
    const data = {
      dbuser: this.db_user.value.trim(),
      dbpassword: this.db_password.value.trim(),
      machineUser: this.machine_User.value.trim(),
      machinePassword: this.machine_Password.value.trim(),
      dstDirectory: this.dst_Directory.value.trim()
    };
    if (!name) {
      return;
    }

    const { editMode, saveDbName } = this.props;

    saveDbName(name, data, editMode);
  };

  toggleDbModal = () => {
    const { editMode, toggleDbModal } = this.props;

    if (editMode) {
      toggleDbModal();
    }
  };

  render() {
    console.log("DbModal rendering"); // eslint-disable-line no-console
    const { name, showModal } = this.props;

    return (
      <Modal show={showModal} onHide={this.toggleDbModal}>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-control input-lg"
              ref={(dbname) => {
                this.dbname = dbname;
              }}
              type="text"
              placeholder="Enter Database Name"
              defaultValue={name}
              autoFocus
            />
            <input
              className="form-control input-lg"
              ref={(db_user) => {
                this.db_user = db_user;
              }}
              type="text"
              placeholder="Enter Database User"
              autoFocus
            />
            <input
              className="form-control input-lg"
              ref={(db_password) => {
                this.db_password = db_password;
              }}
              type="text"
              placeholder="Enter Database Password"
              autoFocus
            />
            <input
              className="form-control input-lg"
              ref={(machine_User) => {
                this.machine_User = machine_User;
              }}
              type="text"
              placeholder="Enter Machine User"
              autoFocus
            />
            <input
              className="form-control input-lg"
              ref={(machine_Password) => {
                this.machine_Password = machine_Password;
              }}
              type="text"
              placeholder="Enter Machine Password"
              autoFocus
            />
            <input
              className="form-control input-lg"
              ref={(dst_Directory) => {
                this.dst_Directory = dst_Directory;
              }}
              type="text"
              placeholder="Enter Destination Directory"
              autoFocus
            />
          </form>
        </Modal.Body>
        <Modal.Footer className="modal-footer text-right">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.toggleDbModal}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DbModal;
