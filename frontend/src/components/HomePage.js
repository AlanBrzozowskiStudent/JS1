import AdsList from "./AdsList";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Container className="mt-5">
        <h1 className="mb-4">Look at Our Featured Listings</h1>
        <AdsList />
      </Container>

      <div className="bg-dark text-white mt-5 py-3 text-center">
        <Container>
          MyNewHome © 2024 | Your trusted real estate partner
        </Container>
      </div>
    </>
  );
};

export default HomePage;
