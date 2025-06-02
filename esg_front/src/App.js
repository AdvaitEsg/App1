import React from 'react';
import 'antd/dist/reset.css';
import ESGUnifiedForm from './pages/ESGUnifiedForm';
import './App.css';

const styles = {
  app: {
    backgroundColor: 'grey',
  },
  header: {
    backgroundColor: 'rgb(75, 71, 71)',
    color: '#fff',
    padding: '50px 0',
    textAlign: 'center',
  },
  main: {
    padding: '40px',
    textAlign: 'center',
    fontSize: '1.0rem',
    paddingBottom: "30px",
  },

  logo: {
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  footer: {
    gap: '20px',
    padding: '30px',
    backgroundColor: 'rgb(75, 71, 71)',
  },
};

function App() {
  return (
    <div>
      {/* Header Bar */}
      <header style={styles.header}>
        <div style={styles.logo}>Breathe ESG</div>
      </header>
      {/* Main Content */}
       <div style={styles.app}>
        <h1 style={{ fontSize: '2.0rem',textAlign: 'center',fontStyle: 'italic',fontFamily: 'Arial, sans-serif', }}><span style={{ textDecoration: 'overline' }}>In Natura Speramus</span></h1>
        <main style={styles.main}>
        <ESGUnifiedForm />
        </main>
      </div>
      {/* Footer Cards */}
      <footer style={styles.footer}>
      </footer>
      </div>
  );
}

export default App;
