import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

const AddBook = () => {
    const bookCategories=["Fiction", "Science", "Technology", "Biography", "History", "Self-Help", "Romance", "Fantasy", "Mystery", "Horror", "Thriller", "Children", "Young-Adult", "Poetry", "Comics", "Cookbooks", "Travel", "Art", "Diaries", "Dictionaries", "Encyclopedias", "Guide", "Health", "Journal", "Math", "Music", "Philosophy", "Prayer", "Religion", "Science-Fiction", "Sports", "True-Crime", "War", "Westerns", "Other"];
    const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]); 
    
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }
    const handleBookSubmit = (e) => {
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
        console.log(bookObj);
        fetch('http://localhost:3000/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookObj)
        }).then(res => res.text()).then(data => {
            console.log(data);
            form.reset();
            alert('Book added successfully');
        }).catch(err => console.log(err));
    }
  return (
    <div className="px-4 my-12 ">
        <h2 className="mb-8 text-3xl font-bold">Upload a book</h2>
        <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* first row */}
        <div className="flex gap-8">
        <div className="lg:w-1/2">
        <div className="mb-2 block">
          <Label htmlFor="bookTitle" value="Book Title" />
        </div>
        <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Enter book name" required />
      </div>
      <div className="lg:w-1/2">
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName" name="authorName" type="text" placeholder="Enter author name" required />
      </div>
        </div>
        {/* second row */}
        <div className="flex gap-8">
        <div className="lg:w-1/2">
        <div className="mb-2 block">
          <Label htmlFor="imageURL" value="Book Image URL" />
        </div>
        <TextInput id="imageURL" name="imageURL" type="text" placeholder="Enter book image link" required />
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
        <TextInput id="bookPDFURL" name="bookPDFURL" type="text" placeholder="Enter book pdf link" required />
        </div>

        {/* book description */}
        <div>
        <div className="mb-2 block">
          <Label htmlFor="bookDescription" value="Book Description" />
        </div>
        <Textarea id="bookDescription" name="bookDescription" placeholder="Enter book description" required rows={4}
         />
        </div>

        
        <Button type="submit" className="mt-5">Upload</Button>
    </form>    
    </div>
  )
}

export default AddBook
