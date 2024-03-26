import React, { useEffect, useState } from "react";
import { wizard_2 } from "../assets";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (

    <section className="max-w-7xl mx-auto">
      <div className="bg-white">
        <div className=" min-h-[calc(100vh-73px)]">
          <div className="relative isolate overflow-hidden bg-white pt-6 md:pt-24 lg:flex lg:gap-x-20 lg:pt-0">
            <div className="max-w-xl text-center lg:mx-0 lg:flex-auto md:pt-40 lg:text-left">
              <h2 className="max-w-2xl mb-4 text-4xl text-center font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                Witaj w NightSky!
              </h2>
              <p className="mt-6 text-lg leading-8 text-black text-center">
              Nasza innowacyjna aplikacja, wykorzystująca sztuczną inteligencję, zapewnia fascynującą możliwość generowania realistycznych widoków nocnego nieba. Dzięki zaawansowanym algorytmom, aplikacja pozwala użytkownikom odkryć i zanurzyć się w wirtualnej przestrzeni kosmicznej.
              </p>
              <div className="mt-10 flex items-center justify-center">
                <a
                  href="/create-post"
                  className="rounded-md bg-amber-500 px-10 py-5 text-sm font-semibold text-xl text-white shadow-sm hover:bg-amber-600"
                >
                  Generuj
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-100 lg:mt-8 md:w-[57rem]">
              <img
                className="bg-white align-middle h-200 w-200"
                src={wizard_2}
                alt="NightSky Wizard"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Twórczość społeczności
        </h1>
        <p className="mt-2 text-[#666e75] max-w-[600px] text-lg leading-8">
          Przeglądaj kolekcję pomysłowych i wizualnie oszałamiających obrazów
          wygenerowanych przez DALL-E API
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Szukaj"
          type="text"
          name="text"
          placeholder="Szukana fraza/frazy..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Wyniki dla{" "}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="Nie znaleziono szukanej frazy :("
                />
              ) : (
                <RenderCards data={allPosts} title="Brak postów użytkowników - bądź pierwszy!" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
