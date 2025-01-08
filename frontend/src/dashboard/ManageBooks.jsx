import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageBooks = () => {
  const [allbooks, setAllbooks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
      setAllbooks(data);
    }).catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
    .then(data => {
      alert('Book deleted successfully');
      console.log(data);
      const newBooks = allbooks.filter(book => book._id !== id);
      setAllbooks(newBooks);
    }).catch(err => console.log(err));
  }
  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Books</h2>
      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>Book Title</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            allbooks.map((book) => <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.bookTitle}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>{book.quantity}</Table.Cell>
              <Table.Cell>
                <Link to={`/admin/dashboard/edit/${book._id}`}className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Edit
                </Link>
                <button onClick={()=> handleDelete(book._id)} className="font-medium px-4 py-1 text-red-600 hover:underline dark:text-red-500">Delete</button>
              </Table.Cell>
            </Table.Row>)
          } 
        </Table.Body>
      </Table>
    </div>
  )
}

export default ManageBooks
