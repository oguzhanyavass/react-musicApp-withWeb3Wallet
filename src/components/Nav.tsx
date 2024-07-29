import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic,faWallet } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface NavProps {
  libraryStatus: boolean;
  setLibraryStatus: (status: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <NavContainer>
      <H1 libraryStatus={libraryStatus}>Vibes</H1>
      <ButtonContainer>
        <Button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </Button>
        <Link href="/user-controlled" passHref>
          <Button>Connect Wallet -- 
          <FontAwesomeIcon icon={faWallet} style={{color: "#ffffff",}} />
          </Button>
        </Link>
      </ButtonContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const H1 = styled.h1<{ libraryStatus: boolean }>`
  transition: all 0.5s ease;
  @media screen and (max-width: 768px) {
    visibility: ${(p) => (p.libraryStatus ? "hidden" : "visible")};
    opacity: ${(p) => (p.libraryStatus ? "0" : "100")};
    transition: all 0.5s ease;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  border: 2px solid rgb(65, 65, 65);
  padding: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    background: rgb(65, 65, 65);
    color: white;
  }
`;

export default Nav;
