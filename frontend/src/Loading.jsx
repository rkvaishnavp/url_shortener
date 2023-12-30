import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Loading = () => {
  const params = useParams();
  const _id = params._id.toString();
  const [valid, setValid] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/shorturl/${_id}`);
        const data = await res.json();
        setValid(true);
        setTimeout(function () {
          window.location.href = data.url;
        }, 1000);
        setValid(false);
      } catch (error) {
        console.error(error);
        setValid(false);
      }
    };
    load();
  }, []);
  return (
    <>
      {valid ? (
        <h1>Redirecting Please Wait</h1>
      ) : (
        <h1 className="">Please wait or Check the short url again</h1>
      )}
    </>
  );
};

export default Loading;
