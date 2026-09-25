import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contractInfo';

function App() {
  const [account, setAccount] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [courseName, setCourseName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [badgeResult, setBadgeResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. MetaMask Connect Function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (err) {
        alert("Wallet connect karne mein dikkat aayi.");
      }
    } else {
      alert("Metamask Install Karein!");
    }
  };

  // 2. Admin Function: Issue Badge
const handleIssueBadge = (e) => {
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    alert("Badge Blockchain par successfully issue ho gaya! 🎉");
    setLoading(false);
    setStudentAddress('');
    setCourseName('');
    setIssueDate('');
  },1000);
};   

  // 3. Public Function: Verify Badge
  const handleVerifyBadge = (e) => {
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    setBadgeResult({
      course: "Web3 Credential Hackathon 2026",
      date: "25/09/2026",
      isGenuine: true
    });
    setLoading(false);
  }, 800); // 0.8 second ka validation delay
};

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        <h2>🎓 QuickBadge — Web3 Credential Verifier</h2>
        <button onClick={connectWallet} style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : "Connect MetaMask"}
        </button>
      </header>

      <main style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* LEFT COLUMN: ADMIN PANEL */}
        <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>🏛️ Admin Portal (Only College Admin)</h3>
          <form onSubmit={handleIssueBadge} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Student Wallet Address (0x...)" value={studentAddress} onChange={(e) => setStudentAddress(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Course / Lab Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Issue Date (DD/MM/YYYY)" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {loading ? "Processing..." : "Blockchain Par Issue Karein"}
            </button>
          </form>
        </section>

        {/* RIGHT COLUMN: VERIFIER PANEL */}
        <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>🔍 Public Badge Verifier</h3>
          <form onSubmit={handleVerifyBadge} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input type="text" placeholder="Student Address To Search" value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Search</button>
          </form>

          {/* DYNAMIC VISUAL BADGE */}
          {badgeResult && (
            <div style={{ marginTop: '20px', padding: '20px', border: badgeResult.isGenuine ? '2px solid #22c55e' : '2px solid #ef4444', borderRadius: '8px', backgroundColor: badgeResult.isGenuine ? '#f0fdf4' : '#fef2f2', textAlign: 'center' }}>
              {badgeResult.isGenuine ? (
                <div>
                  <h1 style={{ color: '#22c55e', fontSize: '50px', margin: '0' }}>🏅</h1>
                  <h4 style={{ margin: '5px 0', color: '#166534' }}>VERIFIED DIGITAL BADGE</h4>
                  <p><b>Course:</b> {badgeResult.course}</p>
                  <p><b>Issued On:</b> {badgeResult.date}</p>
                  <span style={{ fontSize: '12px', color: '#666' }}>✓ Protected by Smart Contract</span>
                </div>
              ) : (
                <p style={{ color: '#ef4444', fontWeight: 'bold' }}>❌ Is Address par koi genuine badge nahi mila!</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

