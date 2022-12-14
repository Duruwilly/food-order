import { useState, useEffect } from "react";
import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import MenuListing from "./MenuListing";
import { MenuList } from "./Navmenu";
import Title from "./Title";
import { Link } from "react-router-dom";
import { Button } from "./Button";

const HalfMenuList = () => {
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(12));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings.slice(0,3));
      } catch (error) {
        toast.error("could'nt fetch menu");
      }
    };
    fetchListings();
  }, []);
  return (
    <section>
      <Title title="our menu" />
      <div className="box-container">
        {listings?.map((menu) => (
          <div className="group relative" key={menu.id}>
            <MenuListing
              menu={menu.data}
              id={menu.id}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/menu">
          <Button title="view more" />
        </Link>
      </div>
    </section>
  );
};

export default HalfMenuList;
