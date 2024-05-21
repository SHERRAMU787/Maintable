import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ScrollView } from 'react-native';

const FetchData = () => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'year', direction: 'ascending' });
  const [selectedYear, setSelectedYear] = useState(null);
  const [jobTitlesData, setJobTitlesData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = require('./android/app/project/data.json');

        const aggregatedData = response.reduce((acc, entry) => {
          const year = entry.work_year;
          if (!acc[year]) {
            acc[year] = { year, total_jobs: 0, total_salary: 0, count: 0 };
          }
          acc[year].total_jobs += 1;
          acc[year].total_salary += entry.salary_in_usd;
          acc[year].count += 1;
          return acc;
        }, {});

        const finalData = Object.values(aggregatedData).map(yearData => ({
          year: yearData.year,
          total_jobs: yearData.total_jobs,
          average_salary_usd: yearData.total_salary / yearData.count,
        }));

        setTableData(finalData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTableData();
  }, []);

  const sortTable = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setTableData(sortedData);
  };

  const handleRowClick = (year) => {
    setSelectedYear(year);

    const response = require('./android/app/project/data.json');
    const filteredData = response.filter(entry => entry.work_year === year);

    const aggregatedJobTitles = filteredData.reduce((acc, entry) => {
      const title = entry.job_title;
      if (!acc[title]) {
        acc[title] = { title, count: 0 };
      }
      acc[title].count += 1;
      return acc;
    }, {});

    const finalJobTitlesData = Object.values(aggregatedJobTitles);

    setJobTitlesData(finalJobTitlesData);
  };

  const renderHeader = () => (
    <View>
      <TouchableOpacity title="Back" onPress={() => setSelectedYear(null)} style={{width:50,backgroundColor:'gray',alignItems:'center',marginBottom:'5%'}} >
        <Text style={{color:'white'}}>
        Back
        </Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerCell} onPress={() => sortTable('year')}>
          <Text style={styles.headerText}>Year</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerCell} onPress={() => sortTable('total_jobs')}>
          <Text style={styles.headerText}>Total Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerCell} onPress={() => sortTable('average_salary_usd')}>
          <Text style={styles.headerText}>Average Salary (USD)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={() => handleRowClick(item.year)}>
      <Text style={styles.cell}>{item.year}</Text>
      <Text style={styles.cell}>{item.total_jobs}</Text>
      <Text style={styles.cell}>{item.average_salary_usd.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderJobTitlesTable = () => {
    if (!selectedYear) {
      return null;
    }

    return (
      <View style={{marginTop:'5%',}}>
       
        <FlatList
          data={jobTitlesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.title}</Text>
              <Text style={styles.cell}>{item.count}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
     <View style={{paddingVertical:15}}>
      <FlatList
        data={tableData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      </View>
      {selectedYear && ( <Text style={{ fontSize: 20, fontStyle: 'italic', paddingVertical: 15 ,backgroundColor:'#808080',color:'white',fontStyle:'italic',marginTop:'5%'}}>
          Job Titles in {selectedYear}
        </Text>)}
      <ScrollView>
       {renderJobTitlesTable()}
       </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#f1f8ff',
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default FetchData;
