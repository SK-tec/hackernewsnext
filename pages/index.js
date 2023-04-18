// import Image from "next/image";
// import { Inter } from "next/font/google";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

export default function Home() {
  const [keyword, setKeyword] = useState("React");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const getResults = async () => {
    try {
      // Replace space with '+'
      let title = keyword.replace(/ /g, "+");
      setLoading(true);
      const { data } = await axios.get("api/search/", {
        params: { title },
      });
      // Add the data to the results state
      setSearchResults(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="md:text-6xl text-4xl font-bold text-blue-800 mt-1">
        Welcome to Hacker News
      </h1>
      <form
        className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex"
        onSubmit={(e) => {
          getResults();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input
          type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter the book's title"
          defaultValue={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setSearchResults(null);
          }}
        />

        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            className="block w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
            type="submit"
          >
            {loading ? (
              <span className="animate-pulse">Loading..</span>
            ) : (
              <>Search</>
            )}
          </button>
        </div>
      </form>
      {searchResults && (
        <div className="mt-10">
          <div>
            {searchResults.map((news) => {
              return (
                <div className="block mb-5 rounded-lg bg-white text-blue-700 text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <div className="flex justify-between border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                    <div>Author: {news.author}</div>
                    <div>
                      {news.points} point{news.points !== 1 && "s"}
                    </div>
                    <div>
                      {news.num_comments} comment
                      {news.num_comments !== 1 && "s"}
                    </div>
                  </div>

                  <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight  dark:text-neutral-50">
                      {news.title}
                    </h5>
                    <p className="mb-4 text-base text-blue-600 dark:text-neutral-200">
                      <a
                        href={news.url}
                        target="_blank"
                        classNameName="link-secondary text-decoration-none"
                      >
                        {news.url}
                      </a>
                    </p>
                  </div>
                  <div className="border-t-2 border-neutral-100 px-6 py-3 text-blue-600 dark:border-neutral-600 dark:text-neutral-50">
                    Created At: {moment(news.created_at).fromNow()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-20 mb-10 text-center">
        <h1 className="text-primary text-xl">Created by - Samatha K </h1>
      </div>
    </main>
  );
}
