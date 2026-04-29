import { useState } from 'react';

interface PostalItem {
  id: string;
  buildingName: string;
  postcode: string;
  destination: string;
  barcode: string;
  weight: string;
}

interface ReceiptData {
  date: string;
  time: string;
  branchName: string;
  branchAddress: string[];
  sessionId: string;
  transactionId: string;
  items: PostalItem[];
}

export default function App() {
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    date: '29/04/2026',
    time: '14:32:15',
    branchName: 'LONDON ROAD BRANCH',
    branchAddress: ['124 LONDON ROAD', 'SHEFFIELD', 'SOUTH YORKSHIRE', 'S2 4LR'],
    sessionId: '001234',
    transactionId: '567890',
    items: [
      {
        id: '1',
        buildingName: 'MR J SMITH\n45 HIGH STREET\nMANCHESTER',
        postcode: 'M1 1AB',
        destination: 'UK',
        barcode: '123456789012345',
        weight: '0.100'
      }
    ]
  });

  const addItem = () => {
    const newItem: PostalItem = {
      id: Date.now().toString(),
      buildingName: '',
      postcode: '',
      destination: 'UK',
      barcode: '',
      weight: '0.000'
    };
    setReceiptData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (id: string, field: keyof PostalItem, value: string) => {
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItem = (id: string) => {
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('PDF download feature would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt Generator</h1>
          <p className="text-gray-600">Create UK Post Office thermal receipts</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Form Panel */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={receiptData.date}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="text"
                      value={receiptData.time}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="HH:MM:SS"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    value={receiptData.branchName}
                    onChange={(e) => setReceiptData(prev => ({ ...prev, branchName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="e.g., LONDON ROAD BRANCH"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch Address (one line per field)</label>
                  {receiptData.branchAddress.map((line, index) => (
                    <input
                      key={index}
                      type="text"
                      value={line}
                      onChange={(e) => {
                        const newAddress = [...receiptData.branchAddress];
                        newAddress[index] = e.target.value;
                        setReceiptData(prev => ({ ...prev, branchAddress: newAddress }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 mb-2"
                      placeholder={`Address line ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session ID</label>
                    <input
                      type="text"
                      value={receiptData.sessionId}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, sessionId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="e.g., 001234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                    <input
                      type="text"
                      value={receiptData.transactionId}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, transactionId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="e.g., 567890"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Postal Items Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Postal Items</h2>
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  + Add Item
                </button>
              </div>

              <div className="space-y-6">
                {receiptData.items.map((item, index) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <h3 className="text-sm font-medium text-gray-700 mb-3">Item {index + 1}</h3>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address (multi-line)</label>
                        <textarea
                          value={item.buildingName}
                          onChange={(e) => updateItem(item.id, 'buildingName', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="MR J SMITH&#10;45 HIGH STREET&#10;MANCHESTER"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">PostCode</label>
                          <input
                            type="text"
                            value={item.postcode}
                            onChange={(e) => updateItem(item.id, 'postcode', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="M1 1AB"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                          <input
                            type="text"
                            value={item.destination}
                            onChange={(e) => updateItem(item.id, 'destination', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="UK"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Barcode Number</label>
                        <input
                          type="text"
                          value={item.barcode}
                          onChange={(e) => updateItem(item.id, 'barcode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="123456789012345"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight (Kg)</label>
                        <input
                          type="text"
                          value={item.weight}
                          onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="0.100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
                >
                  Print Receipt
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-white text-gray-900 border-2 border-gray-900 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Receipt Preview */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>

              <div className="flex justify-center">
                <div className="bg-gray-50 p-8 rounded">
                  <pre
                    id="receipt-preview"
                    className="bg-white"
                    style={{
  width: '300px',
  fontFamily: '"Courier New", monospace',
  fontSize: '10.5px',
  lineHeight: '1.15',
  letterSpacing: '0.2px',
  color: '#000',
  padding: '14px 10px',
  whiteSpace: 'pre'
}}
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        const width = 42;

                        const padRight = (str: string, len: number) =>
                          (str + ' '.repeat(len)).substring(0, len);

                        const center = (str: string) => {
                          if (str.length >= width) return str;
                          const totalSpaces = width - str.length;
                          const left = Math.floor(totalSpaces / 2);
                          return ' '.repeat(left) + str;
                        };

                        let out = '';

                        // HEADER
                        out += center('Post Office Ltd.') + '<br/>';
                        out += center('www.postoffice.co.uk') + '<br/><br/>';

                        // DATE ROW
                       const left = `${receiptData.date} ${receiptData.time}`;
const right = 'TP:03 BP:01 SU:AA';

// 🔥 FIXED WIDTH APPROACH
const totalWidth = 42; // same as your receipt width

let line = left;

// jitni space bachi hai woh fill karo
while (line.length + right.length < totalWidth) {
  line += ' ';
}

// end pe right add karo
line += right;

out += line + '<br/>';

                        const branch = receiptData.branchName;
                        const fad = `FAD:${receiptData.sessionId}`;
                        out += padRight(branch, width - fad.length) + fad + '<br/>';

                        receiptData.branchAddress.forEach(l => out += l + '<br/>');

                        out += '<br/>';

                        // SESSION
                        out += `Session Id: ${receiptData.sessionId}<br/>`;
                        out += `Txn Id: ${receiptData.transactionId}<br/><br/>`;

                        out += `Session Id: ${receiptData.sessionId}<br/><br/>`;

                        // TITLE
                        out += 'Horizon Certificate of Posting<br/><br/>';

                        out += 'Items addressed as follows:-<br/><br/>';

                        // ITEMS
                       receiptData.items.forEach(item => {
  const lines = item.buildingName.split('\n').filter(l => l.trim() !== '');
  const name = lines[0] || '';

  // 🔥 block bana rahe hain (same spacing)
  let block = '';

  block += 'Building Name or No: ' + name + '\n';
  block += '  PostCode/Zip Code: ' + item.postcode + '\n';
  block += '        Destination: ' + item.destination + '\n';
  block += '     Barcode Number: ' + item.barcode + '\n';
  block += '     Weight Of Item: ' + item.weight + ' Kg\n\n';

  // 🔥 sirf barcode bold karna hai → replace karo
  block = block.replace(
    'Barcode Number: ' + item.barcode,
    '<strong>Barcode Number: ' + item.barcode + '</strong>'
  );

  // 🔥 poora block center ho raha hai (IMPORTANT)
  out += '<div style="text-align:center;">' +
         '<pre style="display:inline-block; text-align:left; margin:0;">' +
         block +
         '</pre></div>';
});

                        // FOOTER
                        out += 'Have been accepted here today.<br/><br/>';

                        out += center('It is important that you retain this') + '<br/>';
                        out += center('receipt as it is your Proof Of Posting.') + '<br/><br/>';

                        out += center('Please refer to Separate Terms and') + '<br/>';
                        out += center('Conditions.') + '<br/><br/>';

                        out += center('This is not a VAT receipt');

                        return out;
                      })()
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Print Styles */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #receipt-preview, #receipt-preview * {
              visibility: visible;
            }
            #receipt-preview {
              position: absolute;
              left: 50%;
              top: 0;
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}