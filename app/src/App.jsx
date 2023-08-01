import React from "react";
import "./styles/index.scss";
import axios from "axios";
const api_host = "http://localhost:3001";

function App() {
  // state to store the book reviews
  const [bookReviews, setBookReviews] = React.useState([]);
  const [bookName, setBookName] = React.useState("");
  const [bookReview, setBookReview] = React.useState("");

  // function to get the book reviews
  const getBookReviews = async () => {
    console.log("getBookReviews");

    // call the axios get method to get the book reviews
    axios
      .get(`${api_host}/book_reviews`)
      .then((response) => {
        console.log("response", response);

        // set the book reviews
        setBookReviews(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // call the getBookReviews function when the component is loaded
  React.useEffect(() => {
    getBookReviews();
  }, []);

  // function to add the book review
  const addBookReview = async () => {
    console.log("addBookReview");
    // console.log("bookName", bookName);

    // check if the book name is empty
    if (bookName === "") {
      alert("Please enter the book name");
      return;
    }

    // check if the book review is empty
    if (bookReview === "") {
      alert("Please enter the book review");
      return;
    }

    // add the book review to the list of book reviews by calling axios post method
    await axios
      .post(`${api_host}/book_review`, {
        bookName: bookName,
        bookReview: bookReview,
      })
      .then((response) => {
        console.log("response", response);

        // check if the response is success
        // if (response.data.success) {
        //   alert("Book review added successfully");
        // } else {
        //   alert("Failed to add book review");
        // }
        // alert("Book review added successfully");
      })
      .catch((error) => {
        console.log("error", error);
        alert("Failed to add book review");
      });

    // reset the book name and book review
    setBookName("");
    setBookReview("");

    // call the getBookReviews function to get the updated list of book reviews
    getBookReviews();
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Book Store Reviews
          </h1>
          {/* horizontal line below */}
          <hr className="my-4" />

          <div className="flex flex-col">
            <div className="flex flex-row px-2 gap-2">
              {/* form to Add Book Reviews */}
              <form className="flex flex-col w-1/2">
                <div className="flex flex-col mb-4">
                  <label
                    className="mb-2 font-bold text-gray-800"
                    htmlFor="name"
                  >
                    Book Name
                  </label>
                  <input
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    id="name"
                    placeholder="Book Name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    className="mb-2 font-bold text-gray-800"
                    htmlFor="review"
                  >
                    Book Review
                  </label>
                  <textarea
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    id="review"
                    placeholder="Book Review"
                    value={bookReview}
                    onChange={(e) => setBookReview(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex flex-col mb-4">
                  {/* button to add the reiew */}
                  <button
                    className="px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="button"
                    onClick={addBookReview}
                  >
                    Add Review
                  </button>
                </div>
              </form>

              {/* list of book reviews */}
              <div className="flex flex-col w-1/2 border">
                {/* headings */}
                <div className="flex flex-row px-2 py-2 border-b">
                  <div className="flex flex-row bg-gray-200 w-full gap-x-64">
                    <span className="font-bold text-gray-800">
                      Book Reviews
                    </span>
                  </div>
                </div>

                {bookReviews.map((bookReview, key) => {
                  return (
                    <div key={key} className="flex flex-col px-2 py-2 border-b">
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">
                            {bookReview?.bookName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {bookReview?.bookReview}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
