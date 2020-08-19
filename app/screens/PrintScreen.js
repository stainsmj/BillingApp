import React from 'react';
import {ScrollView, Text} from 'react-native';
import {DataTable} from 'react-native-paper';
import {useSelector} from 'react-redux';

const PrintScreen = () => {
  const printItems = useSelector((state) => state.store);
  const getTotal = () => {
    let total = 0;
    printItems.map((item) => {
      total += item.amount * item.price;
    });
    return total;
  };
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>NAME</DataTable.Title>
          <DataTable.Title numeric>AMOUNT</DataTable.Title>
          <DataTable.Title numeric>PRICE</DataTable.Title>
          <DataTable.Title numeric>TOTAL</DataTable.Title>
        </DataTable.Header>

        {printItems.map((item) => (
          <DataTable.Row>
            <DataTable.Cell>{item.title}</DataTable.Cell>
            <DataTable.Cell numeric>
              {item.amount} {item.measurementIn}
            </DataTable.Cell>
            <DataTable.Cell numeric>{item.price}</DataTable.Cell>
            <DataTable.Cell numeric>{item.price * item.amount}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row>
          <DataTable.Title>NET TOTAL</DataTable.Title>
          <DataTable.Cell numeric>{getTotal()}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </ScrollView>
  );
};

export default PrintScreen;
