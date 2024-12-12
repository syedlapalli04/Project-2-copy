import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    rating: 0,
    copies: 0,
    notes: "",
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function validateForm() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.author.trim()) newErrors.author = "Author is required.";
    if (!form.genre.trim()) newErrors.genre = "Genre is required.";
    if (form.rating < 0 || form.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5.";
    if (form.copies < 0)
      newErrors.copies = "Copies cannot be negative.";
    if (!form.type) newErrors.type = "Book type is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ title: "", author: "", genre: "", rating: "", copies: "", notes: "", type: "" });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Book Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Book Information
            </h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Book Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    //placeholder="First Last"
                    value={form.title}
                    onChange={(e) => updateForm({ title: e.target.value })}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Author
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    //placeholder="Developer Advocate"
                    value={form.author}
                    onChange={(e) => updateForm({ author: e.target.value })}
                  />
                  {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="genre"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Genre
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="genre"
                    id="genre"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    //placeholder="Developer Advocate"
                    value={form.genre}
                    onChange={(e) => updateForm({ genre: e.target.value })}
                  />
                  {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Rating
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    //placeholder="Developer Advocate"
                    value={form.rating}
                    onChange={(e) => updateForm({ rating: e.target.value })}
                  />
                  {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="copies"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Copies
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="copies"
                    id="copies"
                    min="0"
                    step="1" 
                    oninput="validity.valid||(value='');"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    //placeholder="Developer Advocate"
                    value={form.copies}
                    onChange={(e) => updateForm({ copies: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Notes
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="notes"
                    id="notes"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    //placeholder="Developer Advocate"
                    value={form.notes}
                    onChange={(e) => updateForm({ notes: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Book Type Options</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="typeFiction"
                      name="typeOptions"
                      type="radio"
                      value="Fiction"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.type === "Fiction"}
                      onChange={(e) => updateForm({ type: e.target.value })}
                    />
                    <label
                      htmlFor="typeFiction"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Fiction
                    </label>
                    <input
                      id="typeNonFiction"
                      name="typeOptions"
                      type="radio"
                      value="Non-Fiction"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.type === "Non-Fiction"}
                      onChange={(e) => updateForm({ type: e.target.value })}
                    />
                    <label
                      htmlFor="typeNonFiction"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Non-Fiction
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Book Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}