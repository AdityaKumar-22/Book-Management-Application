import { useLoaderData, useParams} from "react-router-dom"
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL} = useLoaderData();


  const bookCategories=["Fiction", "Science", "Technology", "Biography", "History", "Self-Help", "Romance", "Fantasy", "Mystery", "Horror", "Thriller", "Children", "Young-Adult", "Poetry", "Comics", "Cookbooks", "Travel", "Art", "Diaries", "Dictionaries", "Encyclopedias", "Guide", "Health", "Journal", "Math", "Music", "Philosophy", "Prayer", "Religion", "Science-Fiction", "Sports", "True-Crime", "War", "Westerns", "Other"];
      const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]); 
      
      const handleCategoryChange = (e) => {
          setSelectedCategory(e.target.value);
      }
      const handleBookUpdate = (e) => {
          e.preventDefault();
          const form=e.target
          const bookTitle = form.bookTitle.value;
          const authorName = form.authorName.value;
          const imageURL = form.imageURL.value;
          const category = form.category.value;
          const bookPDFURL = form.bookPDFURL.value;
          const bookDescription = form.bookDescription.value;
          const bookObj = {
              bookTitle,
              authorName,
              imageURL,
              category,
              bookPDFURL,
              bookDescription
          }
          fetch(`http://localhost:3000/update/${id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(bookObj)
          }).then(res => res.json()).then(data => {
              console.log(data);
              // form.();
              alert('Book updated successfully');
          }).catch(err => console.log(err));
      }
    return (
      <div className="px-4 my-12 ">
          <h2 className="mb-8 text-3xl font-bold">Update the book data</h2>
          <form onSubmit={handleBookUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
          {/* first row */}
          <div className="flex gap-8">
          <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="bookTitle" value="Book Title" />
          </div>
          <TextInput id="bookTitle" name="bookTitle" type="text" defaultValue={bookTitle} required />
        </div>
        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="authorName" value="Author Name" />
          </div>
          <TextInput id="authorName" name="authorName" type="text" defaultValue={authorName} required />
        </div>
          </div>
          {/* second row */}
          <div className="flex gap-8">
          <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="imageURL" value="Book Image URL" />
          </div>
          <TextInput id="imageURL" name="imageURL" type="text" defaultValue={imageURL} required />
        </div>
        {/* category */}
        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="category" value="Category" />
          </div>
          <Select id="category" name="categoryName" value={selectedCategory} onChange={handleCategoryChange}className="w-full rounded"> 
          {
              bookCategories.map((category) => <option key={category} value={category}>{category}</option>)
          }
          </Select>
        </div>
          </div>
  
          {/* book pdf link */}
          <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput id="bookPDFURL" name="bookPDFURL" type="text" defaultValue={bookPDFURL} required />
          </div>
  
          {/* book description */}
          <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea id="bookDescription" name="bookDescription" defaultValue={bookDescription} required rows={4}
           />
          </div>
  
          
          <Button type="submit" className="mt-5">Update</Button>
      </form>    
      </div>
    )
}

export default EditBooks
