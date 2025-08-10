
export default function Settings(){
  return (
    <div className="card">
      <h2>Settings</h2>
      <p>This demo runs fully in your browser using localStorage (no backend). For production, wire up Firebase in <code>src/services/firebase.ts</code> and switch the data provider.</p>
      <ul>
        <li>Mobile ready & PWA manifest included.</li>
        <li>QR generation and scanning (camera permission required).</li>
        <li>Calendar view and CSV export.</li>
      </ul>
      <p className="small">Hint: add this page to your home screen on iOS/Android to test as a lab-friendly web app.</p>
    </div>
  )
}
