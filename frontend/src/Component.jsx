import React, { useCallback, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import ReactLoading from "react-loading";
import { Toast, ToastToggle } from "flowbite-react";

const Component = () => {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState("");
  const [url, setUrl] = useState("");
  let json = {
    url: url,
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });
      const data = await res.json();
      console.log(data);
      setLink(`${window.location.href}/${data._id}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onCopy = useCallback(() => {
    setCopied(true);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <h1 className="bg-gray-600 font-bold text-yellow-500 text-7xl h-[20%] w-full mb-10 flex items-center justify-center">
        URL Shortener
      </h1>
      <input
        type="text"
        className="border-solid border-x-orange-900 border-4 w-[40%] mb-5 flex items-center"
        placeholder="https://www.google.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="submit"
        className="border-4 bg-orange-500 w-[40%]"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {link !== "" && (
        <>
          {loading ? (
            <>
              <ReactLoading
                className="m-5"
                type={"spin"}
                color={"black"}
                height={20}
                width={20}
              />
            </>
          ) : (
            <>
              <div className="flex flex-row items-center justify-center">
                <a
                  href={link}
                  className="m-5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link}
                </a>
                <CopyToClipboard onCopy={onCopy} text={link}>
                  <button className="m-5 border-4 bg-orange-500 w-24">
                    Copy URL
                  </button>
                </CopyToClipboard>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Component;
