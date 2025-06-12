export const SinglePurchaseProgress = ({ product }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 text-gray-800">
      <div className="flex items-start gap-6">
        <img
          src="/freezer.png"
          alt="Freezer"
          className="w-24 h-24 object-contain"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-lg">
            Haier Thermocool 219 Liters Inverter Chest Freezer (Silver)
          </h2>
          <p>{product.quantity}</p>
        </div>
        <div className="text-center">
          <div className="rounded-full border-4 border-green-500 text-green-600 font-bold w-12 h-12 flex items-center justify-center mx-auto">
            1/3
          </div>
          <p className="text-sm">Payment cycle</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-md">PAYMENT DETAILS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          <div>
            Item price
            <br />
            <strong>N420,000.00</strong>
          </div>
          <div>
            Installment duration
            <br />
            <strong>4 months</strong>
          </div>
          <div>
            Total amount paid
            <br />
            <strong>N220,000.00</strong>
          </div>
          <div>
            Next due date
            <br />
            <strong>Feb 12, 2025</strong>
          </div>
          <div>
            Next due payment
            <br />
            <strong>N220,000.00</strong>
          </div>
          <div>
            Payment type
            <br />
            <strong>Direct debit</strong>
          </div>
          <div className="col-span-3 text-red-600">
            Late payment charges
            <br />
            <strong>N0.00</strong>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-md mb-2">
          INSTALLMENT PAYMENT STATUS
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div className="text-green-600">
            Downpayment - done
            <br />
            <span className="text-xs text-gray-600">
              Feb 12, 2025 - N320,000
            </span>
          </div>
          <div className="text-yellow-500">
            Next payment
            <br />
            <span className="text-xs text-gray-600">
              Feb 12, 2025 - N220,000
            </span>
          </div>
          <div className="text-gray-400">
            Next payment
            <br />
            <span className="text-xs text-gray-500">
              Mar 12, 2025 - N220,000
            </span>
          </div>
          <div className="text-gray-400">
            Final payment
            <br />
            <span className="text-xs text-gray-500">
              Apr 12, 2025 - N220,000
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Status */}
      <div>
        <h3 className="font-semibold text-md mb-2">DELIVERY STATUS</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="text-green-600">
            Order received
            <br />
            <span className="text-xs text-gray-600">Feb 12, 2025</span>
          </div>
          <div className="text-green-600">
            Installment payment
            <br />
            <span className="text-xs text-gray-600">First payment done</span>
          </div>
          <div className="text-gray-400">
            Shipping Status
            <br />
            <span className="text-xs">Delivered</span>
          </div>
          <div className="text-gray-400">
            Item Status
            <br />
            <span className="text-xs">Item received</span>
          </div>
        </div>
        <p className="text-xs mt-2 text-gray-500">
          Estimated delivery date <strong>12 December 2024</strong>
        </p>
      </div>

      {/* Item Details */}
      <div>
        <h3 className="font-semibold text-md">ITEM DETAILS</h3>
        <p className="text-sm">
          Order id: <strong>160345</strong>
        </p>
        <p className="text-sm">
          Haier Thermocool 219 Liters Inverter Chest Freezer (Silver)
        </p>
        <p className="text-sm">50" TV Crystal UHD</p>
        <p className="text-sm">Model: A6X | SKU: H36E8LI5JUTNAFAMZ</p>
        <p className="text-sm">
          Sold by <strong>Fair</strong>
        </p>
      </div>
    </div>
  );
};
