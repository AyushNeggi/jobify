import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Software Developer",
  "Full Stack Developer",
  "Mern Stack Developer",
  "Java Developer",
  "AI ML Developer",
  "Web Developer",
  "Analyst",
  "Frontend Developer",
  "Backend Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {category.map((cat) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full bg-[#ECBDF2] w-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />                          {/*//for arrows */}
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
