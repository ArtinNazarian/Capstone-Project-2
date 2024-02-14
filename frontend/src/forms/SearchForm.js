import { useState } from "react";
import { Button, Input } from "reactstrap";

/**
 * A search form component that allows users to enter a search term and
 * submit it to a parent component to perform a search.
 *
 * @param {Function} search - A function to call when the form is submitted.
 *                            Should accept a search term as a parameter.
 *
 * @returns {JSX.Element} - The search form JSX element.
 */
function SearchForm({ searchFor }) {
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * Handles form submission by calling the parent component's search function
     * with the search term, if one was entered.
     *
     * @param {Object} evt - The form submission event.
     */
    function handleSubmit(evt) {
        evt.preventDefault();
        let trimmedSearchTerm = searchTerm.trim();
        console.log('Trimmed search term:', trimmedSearchTerm);
        searchFor(trimmedSearchTerm || undefined);
        setSearchTerm(trimmedSearchTerm);
    }
    

    /**
     * Updates the search term state as the user types in the search field.
     *
     * @param {Object} evt - The input change event.
     */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }    

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="searchTerm"
                    type="search"
                    placeholder="Enter search term..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <Button type="submit" className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Search
                </Button>
            </form>
        </div>
    );
}

export default SearchForm;