import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";


const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.title}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.author}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.genre}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.rating}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.copies}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.notes}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.type}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

//Added onGenreUpdate
export default function RecordList({onGenresUpdate, selectedGenre }) {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [report, setReport] = useState({});


  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);

      //Extract Unique Genres - NEW
      const genres = [...new Set(records.map((record) => record.genre))];
      console.log("Extracted genres:", genres);
      onGenresUpdate(genres); 

    }
    getRecords();
  }, [onGenresUpdate]);

  useEffect(() => {
    if (selectedGenre) {
      setFilteredRecords(records.filter((record) => record.genre === selectedGenre));
    } else {
      setFilteredRecords(records);
    }
  }, [selectedGenre, records]);

  useEffect(() => {
    if (filteredRecords.length > 0) {
      const numBooks = filteredRecords.length;
      const ratings = filteredRecords.map((record) => record.rating);
      const copies = filteredRecords.map((record) => record.copies);

      const averageRating = (ratings.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / numBooks).toFixed(2)
      const highestRating = Math.max(...ratings);
      const lowestRating = Math.min(...ratings);
      const averageCopies = (copies.reduce((a, b) => parseInt(a) + parseInt(b), 0) / numBooks).toFixed(2);

      setReport({
        numBooks,
        averageRating,
        highestRating,
        lowestRating,
        averageCopies,
      });
    } else {
      setReport({});
    }
  }, [filteredRecords]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }


  // This method will map out the records on the table
  function recordList() {
    return filteredRecords.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
    {selectedGenre && (
        <div className="p-4">
          <h4 className="text-md font-semibold">Report for {selectedGenre} Books</h4>
          {report.numBooks ? (
            <ul>
              <li>Total Books: {report.numBooks}</li>
              <li>Average Rating: {report.averageRating}</li>
              <li>Highest Rating: {report.highestRating}</li>
              <li>Lowest Rating: {report.lowestRating}</li>
              <li>Average # of Copies per Book: {report.averageCopies}</li>
            </ul>
          ) : (
            <p>No books found for this genre.</p>
          )}
        </div>
      )}
      <h3 className="text-lg font-semibold p-4">Personal Book Log</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Title
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Author
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Genre
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Rating
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  # of Copies
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Notes
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Book Type
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}