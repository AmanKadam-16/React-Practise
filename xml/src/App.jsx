import { useEffect, useState } from "react";
import { dataList } from "./data";
import { XMLParser } from "fast-xml-parser";

const App = () => {
  const parser = new XMLParser();
  const [parsedDataList, setParsedDataList] = useState([]);

  // Helper function to ensure array format
  const ensureArray = (data) => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  };

  // Helper function to parse XML data with array normalization
  const parseXMLData = (xmlString, path) => {
    if (!xmlString) return [];
    const parsed = parser.parse(xmlString);
    return ensureArray(path.split('.').reduce((obj, key) => obj?.[key], parsed));
  };

  useEffect(() => {
    const parsedData = dataList.map((item) => ({
      Student_id: item.Student_id,
      Header: parseXMLData(item.Header, 'NewDataSet.Table'),
      Marks: parseXMLData(item.Marks, 'NewDataSet.Table3'),
      Result: parseXMLData(item.Result, 'NewDataSet.Table4'),
      SubjectTestType: parseXMLData(item.SubjectTestType, 'NewDataSet.Table7'),
      SubjectTestTypeGroupTotal: parseXMLData(item.SubjectTestTypeGroupTotal, 'NewDataSet.Table6'),
      SubjectgroupTotal: parseXMLData(item.SubjectgroupTotal, 'NewDataSet.Table5'),
      Subjects: parseXMLData(item.Subjects, 'NewDataSet.Table1'),
      TestTypes: parseXMLData(item.TestTypes, 'NewDataSet.Table8'),
      Tests: parseXMLData(item.Tests, 'NewDataSet.Table2'),
      grades: parseXMLData(item.grades, 'NewDataSet.Table9'),
    }));
    
    setParsedDataList(parsedData);
    console.log('🎯 Normalized Data:', parsedData);
  }, []);

  const renderArrayLength = (arr) => {
    return `(${arr.length} ${arr.length === 1 ? 'item' : 'items'})`;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">XML Data Parse Prototype</h1>
      {parsedDataList.map((item, index) => (
        <div key={index} className="mb-8 p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Student {index + 1}</h2>
          <p className="mb-4"><strong>Student ID:</strong> {item.Student_id}</p>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-medium mb-2">Header {renderArrayLength(item.Header)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.Header, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Marks {renderArrayLength(item.Marks)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.Marks, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Result {renderArrayLength(item.Result)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.Result, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Subject Test Type {renderArrayLength(item.SubjectTestType)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.SubjectTestType, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Subject Test Type Group Total {renderArrayLength(item.SubjectTestTypeGroupTotal)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.SubjectTestTypeGroupTotal, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Subject Group Total {renderArrayLength(item.SubjectgroupTotal)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.SubjectgroupTotal, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Subjects {renderArrayLength(item.Subjects)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.Subjects, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Test Types {renderArrayLength(item.TestTypes)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.TestTypes, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Tests {renderArrayLength(item.Tests)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.Tests, null, 2)}</pre>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-2">Grades {renderArrayLength(item.grades)}</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(item.grades, null, 2)}</pre>
            </section>
          </div>
          
          <hr className="my-8 border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default App;