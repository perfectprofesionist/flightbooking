// Importing necessary dependencies
import { useState } from 'react';
import { searchFlights } from '../utils/api';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
// FlightSearch component definition
const FlightSearch = () => {
  // State for managing search parameters and flight data
  const [searchParams, setSearchParams] = useState({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2024-02-05', // Replace with your desired date format
    adults: 1
  });
  //Capturing the Api data 
  let flightData: any = null;
  //Api data stoaring state
  const [dataToPrint, setDataToPrint] = useState<any>(null);
  //Show itineraries modal var
  let [showItineraries, setShowItineraries] = useState<any>(null);
  //Show itineraries modal var
  const [isItinerariesOpen, setisItinerariesOpen] = useState(false);
  //Show Booking modal var
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  //TO keep the ticked id for the booking
  const [isBookingID,setIsBookingID] = useState<any>(null);
  //TO show the data in thankyou modal
  const [isThankyouModalOpen,setIsThankyouModalOpen] = useState<any>(false);
  const closeThankyouModal = () =>{
    setIsThankyouModalOpen(false);
  }
  //Capture the passenger details via modal 
  const [passengerformData, setPassengerformData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNumber: '',
  });
  //Handle the Passenger Form Change
  const handlePassengerFormChange = (e: any) => {
    const { name, value } = e.target;
    setPassengerformData({
      ...passengerformData,
      [name]: value,
    });
  };
  //Setup for the dob of the passenger
  const [DOB,setDOB] = useState<any>(new Date());
  const customStyles = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  // Function to close the itineraries modal
  const closeItineraries = () => {
    setisItinerariesOpen(false);
  };
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };
  
  //Handle the current flight booking through api
  const handelBooking = (id: any) =>{
    let bookFlightdata = dataToPrint.data[id];
    console.log(bookFlightdata);
    /* Payload Started */
    const payload = {
      data: {
        type: 'flight-order',
        flightOffers: [
          {
            type: 'flight-offer',
            id: bookFlightdata.id,
            source: 'GDS',
            instantTicketingRequired: false,
            nonHomogeneous: false,
            paymentCardRequired: false,
            issuerCode: '112',
            offers: [
              {
                id: '1',
                link: '1',
                rateKey: '1',
                providerId: '1',
                rateCode: '1',
                rateClass: '1',
                rateType: '1',
                nonRefundable: false,
                restrictedTicket: false,
                refundable: true,
                baggage: {
                  includedCheckedBagsOnly: true,
                },
                fares: [
                  {
                    type: 'fare',
                    id: '1',
                    source: 'GDS',
                    instantTicketingRequired: false,
                    nonHomogeneous: false,
                    refundable: true,
                    lastTicketingDate: '2023-09-26',
                    numberOfBookableSeats: 9,
                    brand: '1',
                  },
                ],
              },
            ],
            travelerPricings: [
              {
                travelerId: '1',
                fareOption: 'STANDARD',
                travelerType: 'ADULT',
                price: {
                  currency: 'USD',
                  total: '1000.00',
                  base: '800.00',
                  fees: [
                    {
                      amount: '50.00',
                      type: 'SUPPLIER',
                    },
                    {
                      amount: '50.00',
                      type: 'TICKETING',
                    },
                  ],
                  grandTotal: '1050.00',
                },
                fareDetailsBySegment: [
                  {
                    segmentId: '1',
                    cabin: 'ECONOMY',
                    fareBasis: 'NAD11',
                    brandedFare: 'NAD11',
                  },
                ],
              },
            ],
          },
        ],
        travelers: [
          {
            id: '1',
            dateOfBirth: '1982-01-16',
            gender: 'MALE',
            name: {
              firstName: 'JOHN',
              lastName: 'DOE',
              title: 'MR',
            },
            contact: {
              emailAddress: 'john.doe@example.com',
              phoneNumber: '+1 415 604 7777',
            },
          },
        ],
        remarks: {
          general: [
            {
              subType: 'GENERAL_MISCELLANEOUS',
              text: 'ONLINE BOOKING FROM API',
            },
          ],
        },
      },
    };
    setIsBookingModalOpen(false);
    setIsThankyouModalOpen(true);
    
    /* Payload End */
  };

  // Function to handle flight search
  const handleSearch = async () => {
    try {
      flightData = await searchFlights(searchParams);
      console.log('Flight search results:', flightData);
      setDataToPrint(flightData);
    } catch (error) {
      // Handle error when data is not fetched
      console.log('Data Not fetched :- ' + error);
    }
  };

  // Function to handle displaying itineraries
  const handelItineraries = (data1: any) => {
    setShowItineraries(data1);
    setisItinerariesOpen(true);
  };

  // Function to parse duration from a string
  const parseDuration = (durationString: string) => {
    const regex = /PT(\d+)H(\d+)M/;
    let match = durationString.match(regex);

    if (!match) {
      const regex1 = /PT(\d+)H/;
      match = durationString.match(regex1);
    }

    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);

      if (!Number.isNaN(minutes)) {
        return hours + ' Hours ' + minutes + ' Minutes';
      } else {
        return hours + ' Hours 0 Minutes';
      }
    } else {
      console.error('Invalid duration format');
      return null;
    }
  };


  return (
    
    <div>
            {/* Flight search form */}
      <form>
        <label>
          Origin:
          <input
            type="text"
            value={searchParams.originLocationCode}
            onChange={(e) => setSearchParams({ ...searchParams, originLocationCode: e.target.value })}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={searchParams.destinationLocationCode}
            onChange={(e) => setSearchParams({ ...searchParams, destinationLocationCode: e.target.value })}
          />
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            value={searchParams.departureDate}
            onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
          />
        </label>
        <label>
          Adults:
          <input
            type="number"
            value={searchParams.adults}
            onChange={(e) => setSearchParams({ ...searchParams, adults: parseInt(e.target.value) })}
          />
        </label>
        <button type="button" onClick={handleSearch}>
          Search Flights
        </button>
      </form>
      {/*Flight Seach Result Modal */}
      <div>
        { dataToPrint != null &&(
          
          <div style={{ textAlign: 'center' }}>
             Flight Result Data
            {/* <table style={{ margin: '0 auto', width: '80%' }}> */}
            <section className="container mx-auto p-6 font-mono">
                {/* Nested table structure for better formatting */}
              {/* Table headers for flight details */}
              <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3 border">ID</th>
                      <th className="px-4 py-3 border">Price</th>
                      <th className="px-4 py-3 border">Currency</th>
                      <th className="px-4 py-3 border">FOR</th>
                      <th className="px-4 py-3 border">Avail Seats</th>
                      <th className="px-4 py-3 border">Last Ticketing Date</th>
                      <th className="px-4 py-3 border">Duration</th>
                      <th className="px-4 py-3 border">Itineary</th>
                      <th className="px-4 py-3 border">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                  {
                    dataToPrint.data.map((element: any,index: any)=>(
                      <tr className="text-gray-700" key={element.id}>
                      <td className="px-4 py-3 border">{element.id}</td>
                      <td className="px-4 py-3 border"> {element.price.total}</td>
                      <td className="px-4 py-3 border"> {element.price.currency}</td>
                      <td className="px-4 py-3 border"> {element.travelerPricings.length > 0 && element.travelerPricings[0].travelerType}</td>
                      <td className="px-4 py-3 border"> {element.numberOfBookableSeats}</td>
                      <td className="px-4 py-3 border"> {element.lastTicketingDate} </td>
                      <td className="px-4 py-3 border"> {parseDuration(element.itineraries[0].duration)} </td>
                      <td className="px-4 py-3 border"> 
                         <button color="blue" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {handelItineraries(index);console.log(showItineraries);}}>
                          Show Itineary
                          <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {element.itineraries[0].segments.length}
                            </span>
                         </button>
                      </td>
                      <td className="px-4 py-3 border"> <button onClick={()=>{setIsBookingModalOpen(true);setIsBookingID(index);}}>Book Now</button></td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
         {/* Modal for displaying itineraries */}
      <Modal ariaHideApp={false} style={customStyles} isOpen={isItinerariesOpen} onRequestClose={closeItineraries}>
         <h1 className='text-center font-semibold text-md text-black-900'>Itineraries</h1>  
            <div>
            <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3 border">ID</th>
                      <th className="px-4 py-3 border">Departure </th>
                      <th className="px-4 py-3 border">Departure At</th>
                      <th className="px-4 py-3 border">Arrival</th>
                      <th className="px-4 py-3 border">Arrival AT</th>
                      <th className="px-4 py-3 border">Duration</th>
                    </tr>
                  </thead>
                  
                    {
                      showItineraries != null && (
                        <tbody className="bg-white">      
                        {
                          dataToPrint.data[showItineraries].itineraries[0].segments.map((element: any,index: any)=>(
                            <tr key={index}>
                              <th className="px-4 py-3 border">{index+1}</th>
                              <th className="px-4 py-3 border">{element.departure.iataCode}</th>
                              <th className="px-4 py-3 border">{element.departure.at.split('T')[0]}</th>
                              <th className="px-4 py-3 border">{element.arrival.iataCode}</th>
                              <th className="px-4 py-3 border">{element.arrival.at.split('T')[0]}</th>
                              <th className="px-4 py-3 border">{parseDuration(element.duration)}</th>
                            </tr>
                          ))
                        }
                        <tr>
                        <th colSpan={3} className="px-4 py-3 border"> Stay Time:- </th>
                        <th colSpan={3} className="px-4 py-3 border"> Total Time:- {parseDuration(dataToPrint.data[showItineraries].itineraries[0].duration)} </th>
                        </tr>
                        </tbody>
                      )
                    }
                  
            </table>
            </div>
      </Modal>
        {/* Modal for Pessenger Data */}
        <Modal ariaHideApp={false} style={customStyles} isOpen={isBookingModalOpen} onRequestClose={closeBookingModal}>
         <h1 className='text-center font-semibold text-md text-black-900'>Itineraries</h1>  
            <div>
            <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3 border">First Name</th>
                      <th className="px-4 py-3 border">Last Name</th>
                      <th className="px-4 py-3 border">Date Of Birth</th>
                      <th className="px-4 py-3 border">Email</th>
                      <th className="px-4 py-3 border">Phone Number</th>
                    </tr>
                  </thead>
                  
             
                        <tbody className="bg-white">      
                     
                            <tr>
                              <th className="px-4 py-3 border">
                                <input className='border' name="firstName" value={passengerformData.firstName} type="text" onChange={handlePassengerFormChange} required/>
                              </th>
                              <th className="px-4 py-3 border">
                              <input className='border' name="lastName" value={passengerformData.lastName} type="text" onChange={()=>{}} required/>
                              </th>
                              <th className="px-4 py-3 border">
                              <DatePicker className='border' name="dob" selected={DOB} onChange= 
                                  {(date: any) => {setDOB(date);handlePassengerFormChange}} required/> 
                              </th>
                              <th className="px-4 py-3 border">
                              <input className='border' name="email"  value={passengerformData.email} onChange={handlePassengerFormChange} type="email" required/>
                              </th>
                              <th className="px-4 py-3 border">
                              <input className='border' type="phone" name="phoneNumber" value={passengerformData.phoneNumber} onChange={handlePassengerFormChange} required/>
                              </th>
                              
                            </tr>
                            <tr>
                              <th colSpan={5}>
                                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={()=> handelBooking(isBookingID)}>
                                  Book Flight
                                </button>
                              </th>
                            </tr>
                    
                        </tbody>
                  
            </table>
            </div>
      </Modal>
      {/*Thankyou Modal */}
      <Modal ariaHideApp={false} style={customStyles} isOpen={isThankyouModalOpen} onRequestClose={closeThankyouModal}>
         <h1 className='text-center font-semibold text-md text-black-900'>Thankyou Page</h1>  
            <div>
            
                <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
                <p className="text-gray-700">
                  Thank you for Booking. We appreciate your business.
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={closeThankyouModal}
                >
                  Close
                </button>
            
            </div>
      </Modal>
    </div>
  );
};

export default FlightSearch;
