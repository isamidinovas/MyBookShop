"use client";
import BookList from "@/components/BooksList/BooksList";
import Sidebar from "@/components/SideBar/SideBar";
import HeroImg from "../assets/Image Hero.svg";
import { Input } from "@/components/UI/input";
import { useState } from "react";
import Header from "@/components/Header/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/api/books";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", search],
    queryFn: () => fetchBooks(search),
    enabled: !!search,
  });
  const books = data || [];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  console.log("b:", books);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="">
      <Header
        title="read and add your insight"
        subtitle="find your favorite book and read it here for free"
        img={HeroImg}
        Input={
          <Input
            type="search"
            value={search}
            onChange={handleChange}
            placeholder="Search Book"
            className="w-[350px] bg-zinc-100"
          />
        }
      ></Header>
      <div className="md:flex bg-slate-100 ">
        <Sidebar />
        <div className="shadow-[0_5px_30px_0_rgba(0,0,0,0.2)]  md:mt-20 mb-20 ">
          <BookList books={books} />
        </div>
      </div>
    </div>
  );
}
