import { View, Text } from "react-native";
import { DataTable } from "react-native-paper";

const Table = ({ colums = [], rows = [] }) => {
  console.log(rows);
  return (
    <DataTable>
      <DataTable.Header>
        {colums.map((col) => (
          <DataTable.Title>{col}</DataTable.Title>
        ))}
      </DataTable.Header>
      {rows.map((row) => (
        <DataTable.Row>
          {row?.map((cell) => (
            <DataTable.Cell>{cell}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
      {rows.length === 0 && <Text>No data.</Text>}
    </DataTable>
  );
};

export default Table;
