"use client";

import "./home.css";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Player from "../../components/Player";
import Song from "../../components/Song";
import Library from "../../components/Library";
import Nav from "../../components/Nav";
import data from "./data";
import { SongType } from "../../types";
import ClientSideWrapper from "../clientside-wrapper"; // Buraya import edin

const Home: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [songs, setSongs] = useState<SongType[]>(data());
  const [currentSong, setCurrentSong] = useState<SongType>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [libraryStatus, setLibraryStatus] = useState<boolean>(false);
  const [songInfo, setSongInfo] = useState<{ currentTime: number; duration: number }>({
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong, isPlaying]);

  const updateTimeHandler = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const current = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong = songs[(currentIndex + 1) % songs.length];
    await setCurrentSong(nextSong);

    const newSongs = songs.map((song) => {
      if (song.id === nextSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      audioRef.current?.play();
    }
  };

  return (
    <ClientSideWrapper> {/* Buraya sarın */}
      <AppContainer libraryStatus={libraryStatus}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Song currentSong={currentSong} />
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setSongs={setSongs}
        />
        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
        />
        <audio
          onLoadedMetadata={updateTimeHandler}
          onTimeUpdate={updateTimeHandler}
          onEnded={songEndHandler}
          ref={audioRef}
          src={currentSong.audio}
        />
      </AppContainer>
    </ClientSideWrapper>
  );
};

const AppContainer = styled.div<{ libraryStatus: boolean }>`
  transition: all 0.5s ease;
  margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export default Home;
