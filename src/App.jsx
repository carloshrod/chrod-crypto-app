import './App.scss';
import { BackToTop, CoinDetails, Converter, Modal, Navbar, Table } from './components';
import { useCoinsContext } from './context/CoinsContext';

function App() {
  const { modalAction } = useCoinsContext();

  return (
    <>
      <Navbar />
      <Table />
      <Modal>
        {modalAction === "details"
          ?
          <CoinDetails/>
          :
          <Converter />
        }
      </Modal>
      <BackToTop/>
    </>
  );
}

export default App;
