/**
 * @flow
 */
import React, { PureComponent } from "react";
import find from "lodash/find";
import type {
  ColumnType,
  ForeignKeyType,
  TableType
} from "../../utils/flowtypes";

type Props = {
  tables: Array<TableType>,
  columns: {
    [tableId: string]: Array<ColumnType>
  },
  data: ForeignKeyType
};

type State = {
  currentForeignTableId: string,
  currentForeignTableName: string,
  currentForeignColumnId: string,
  currentForeignColumnName: string,
  currentRelationshipType: string
};

class ForeignKeyForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const { data } = props;

    this.state = {
      currentForeignTableId: data.on.id,
      currentForeignTableName: data.on.name,
      currentForeignColumnId: data.references.id,
      currentForeignColumnName: data.references.name,
      currentRelationshipType: data.relationship
    };
  }

  props: Props;

  state: State;

  getData = () => {
    const {
      currentForeignColumnId,
      currentForeignColumnName,
      currentForeignTableId,
      currentForeignTableName,
      currentRelationshipType
    } = this.state;

    let invalidData = false;

    if (!currentForeignTableId || !currentForeignColumnId) {
      invalidData = true;
    }

    return {
      references: {
        id: invalidData ? "" : currentForeignColumnId,
        name: invalidData ? "" : currentForeignColumnName
      },
      on: {
        id: invalidData ? "" : currentForeignTableId,
        name: invalidData ? "" : currentForeignTableName
      },
      relationship: invalidData ? "" : currentRelationshipType
    };
  };

  setCurrentForeignTable = (event: { target: { value: string } }) => {
    const { tables } = this.props;

    const selected = event.target.value;
    let name = "";

    if (selected) {
      // eslint-disable-next-line
      name = find(tables, { id: selected }).name;
    }

    this.setState({
      currentForeignTableId: selected,
      currentForeignTableName: name,
      currentForeignColumnId: "",
      currentForeignColumnName: "",
      currentRelationshipType: ""
    });
  };

  setCurrentRelationshipType = (event: { target: { value: string } }) => {
    const selected = event.target.value;
    console.log(selected);
    this.setState({
      currentRelationshipType: selected
    });
    console.log(this.currentRelationshipType);
  };
  setCurrentForeignColumn = (event: { target: { value: string } }) => {
    const { columns } = this.props;
    const { currentForeignTableId } = this.state;

    const selected = event.target.value;
    let name = "";

    if (selected) {
      // eslint-disable-next-line
      name = find(columns[currentForeignTableId], { id: selected }).name;
    }

    this.setState({
      currentForeignColumnId: selected,
      currentForeignColumnName: name
    });
  };

  render() {
    console.log("ForeignKeyForm rendering"); // eslint-disable-line no-console
    const { tables, data, columns } = this.props;
    const { currentForeignTableId } = this.state;

    return (
      <div className="form-group">
        <div className="form-group">
          <strong className="col-xs-3 control-label">Foreign Key:</strong>
        </div>
        <div className="form-group">
          <span className="col-xs-3 control-label">On:</span>
          <div className="col-xs-7">
            <select
              className="form-control"
              defaultValue={data.on.id}
              onChange={this.setCurrentForeignTable}
            >
              <option value="">None</option>
              {tables.map(table => (
                <option key={table.id} value={table.id}>
                  {table.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <span className="col-xs-3 control-label">References:</span>
          <div className="col-xs-7">
            <select
              className="form-control"
              defaultValue={data.references.id}
              onChange={this.setCurrentForeignColumn}
            >
              <option value="">None</option>

              {columns[currentForeignTableId] !== undefined &&
                columns[currentForeignTableId]
                  .filter(column => !column.foreignKey.on.id)
                  .map(column => (
                    <option key={column.id} value={column.id}>
                      {column.name}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <span className="col-xs-3 control-label">Relationship:</span>
          <div className="col-xs-7">
            <select
              className="form-control"
              defaultValue={data.relationship}
              onChange={this.setCurrentRelationshipType}
            >
              <option value="">None</option>
              <option value="OneToOne">One To One</option>
              <option value="OneToMany">One To Many</option>
              <option value="ManyToMany">Many To Many</option>
              <option value="HasOneThrough">Has One Through</option>
              <option value="HasManyThrough">Has Many Through</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default ForeignKeyForm;
