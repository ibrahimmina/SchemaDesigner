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
        <Modal.Header>
          <Modal.Title>Project Configuration </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="col-xs-3 control-label" htmlFor="name">
                Database Name:
              </label>
              <div className="col-xs-9">
                <input
                  className="form-control"
                  ref={(dbname) => {
                    this.dbname = dbname;
                  }}
                  type="text"
                  placeholder="Enter Database Name"
                  defaultValue={name}
                  autoFocus
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-3 control-label" htmlFor="db_user">
                Database User:
              </label>
              <div className="col-xs-9">
                <input
                  className="form-control"
                  ref={(db_user) => {
                    this.db_user = db_user;
                  }}
                  type="text"
                  placeholder="Enter Database User"
                  autoFocus
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-3 control-label" htmlFor="db_password">
                Database Password:
              </label>
              <div className="col-xs-9">
                <input
                  className="form-control"
                  ref={(db_password) => {
                    this.db_password = db_password;
                  }}
                  type="text"
                  placeholder="Enter Database Password"
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-xs-3 control-label" htmlFor="machine_User">
                Machine Root User:
              </label>
              <div className="col-xs-9">
                <input
                  className="form-control"
                  ref={(machine_User) => {
                    this.machine_User = machine_User;
                  }}
                  type="text"
                  placeholder="Enter Machine User"
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label
                className="col-xs-3 control-label"
                htmlFor="machine_Password"
              >
                Machine Root Password:
              </label>
              <div className="col-xs-9">
                <input
                  className="form-control"
                  ref={(machine_Password) => {
                    this.machine_Password = machine_Password;
                  }}
                  type="text"
                  placeholder="Enter Machine Password"
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-xs-3 control-label" htmlFor="dst_Directory">
                Destination Project Directory:
              </label>
              <div className="col-xs-9">
                <input
                  className="form-control"
                  ref={(dst_Directory) => {
                    this.dst_Directory = dst_Directory;
                  }}
                  type="text"
                  placeholder="Enter Destination Directory"
                  autoFocus
                />
              </div>
            </div>
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
