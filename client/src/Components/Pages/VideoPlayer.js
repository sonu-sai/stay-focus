import React from "react";
import YouTube from "react-youtube";

export default function VideoPlayer({ match }) {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  let VideoId = match.params.id;

  console.log(VideoId);
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,

        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const opts = {
    width: `${dimensions.width}`,
    height: `${dimensions.height * 0.9}`,
    playerVars: {
      //   "https://developers.google.com/youtube/player_parameters"
      autoplay: 1,
    },
  };
  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  return (
    <>
      <YouTube videoId={VideoId.slice(1)} opts={opts} onReady={_onReady} />
    </>
  );
}
